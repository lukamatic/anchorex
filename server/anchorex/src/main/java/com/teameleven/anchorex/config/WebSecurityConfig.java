package com.teameleven.anchorex.config;

import com.teameleven.anchorex.security.auth.RestAuthenticationEntryPoint;
import com.teameleven.anchorex.security.auth.TokenAuthenticationFilter;
import com.teameleven.anchorex.serviceimpl.CustomUserDetailsServiceImpl;
import com.teameleven.anchorex.util.TokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
// Ukljucivanje podrske za anotacije "@Pre*" i "@Post*" koje ce aktivirati
// autorizacione provere za svaki pristup metodi
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	// Servis koji se koristi za citanje podataka o korisnicima aplikacije
	private final CustomUserDetailsServiceImpl customUserDetailsServiceImpl;

	// Handler za vracanje 401 kada klijent sa neodogovarajucim korisnickim imenom i
	// lozinkom pokusa da pristupi resursu
	private final RestAuthenticationEntryPoint restAuthenticationEntryPoint;

	// Injektujemo implementaciju iz TokenUtils klase kako bismo mogli da koristimo
	// njene metode za rad sa JWT u TokenAuthenticationFilteru
	private final TokenUtils tokenUtils;

	public WebSecurityConfig(CustomUserDetailsServiceImpl customUserDetailsServiceImpl,
			RestAuthenticationEntryPoint restAuthenticationEntryPoint, TokenUtils tokenUtils) {
		this.customUserDetailsServiceImpl = customUserDetailsServiceImpl;
		this.restAuthenticationEntryPoint = restAuthenticationEntryPoint;
		this.tokenUtils = tokenUtils;
	}

	// Implementacija PasswordEncoder-a koriscenjem BCrypt hashing funkcije.
	// BCrypt po defalt-u radi 10 rundi hesiranja prosledjene vrednosti.

	// @Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	// Registrujemo authentication manager koji ce da uradi autentifikaciju
	// korisnika za nas
	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	// Definisemo nacin utvrdjivanja korisnika pri autentifikaciji
	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth
				// Definisemo uputstva AuthenticationManager-u:

				// 1. koji servis da koristi da izvuce podatke o korisniku koji zeli da se
				// autentifikuje
				// prilikom autentifikacije, AuthenticationManager ce sam pozivati
				// loadUserByUsername() metodu ovog servisa
				.userDetailsService(customUserDetailsServiceImpl)

				// 2. kroz koji enkoder da provuce lozinku koju je dobio od klijenta u zahtevu
				// da bi adekvatan hash koji dobije kao rezultat hash algoritma uporedio sa onim
				// koji se nalazi u bazi (posto se u bazi ne cuva plain lozinka)
				.passwordEncoder(passwordEncoder());
	}

	// Definisemo prava pristupa za zahteve ka odredjenim URL-ovima/rutama
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.antMatcher("/api/**")
				// komunikacija izmedju klijenta i servera je stateless posto je u pitanju REST
				// aplikacija
				// ovo znaci da server ne pamti nikakvo stanje, tokeni se ne cuvaju na serveru
				// ovo nije slucaj kao sa sesijama koje se cuvaju na serverskoj strani -
				// STATEFULL aplikacija
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()

				// sve neautentifikovane zahteve obradi uniformno i posalji 401 gresku
				.exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint).and()

				// svim korisnicima dopusti da pristupe sledecim putanjama:
				.authorizeRequests().antMatchers("/api/auth/**").permitAll() // /api/auth/**
				.antMatchers("/h2-console/**").permitAll() // /h2-console/** ako se koristi H2 baza)
				.antMatchers("/api/tests").permitAll() // /api/foo
				.antMatchers("/api/validateToken").permitAll() // /api/foo

				// ukoliko ne zelimo da koristimo @PreAuthorize anotacije nad metodama
				// kontrolera, moze se iskoristiti hasRole() metoda da se ogranici
				// koji tip korisnika moze da pristupi odgovarajucoj ruti. Npr. ukoliko zelimo
				// da definisemo da ruti 'admin' moze da pristupi
				// samo korisnik koji ima rolu 'ADMIN', navodimo na sledeci nacin:
				// .antMatchers("/admin").hasRole("ADMIN") ili
				// .antMatchers("/admin").hasAuthority("ROLE_ADMIN")

				// za svaki drugi zahtev korisnik mora biti autentifikovan
				.anyRequest().authenticated().and()

				// za development svrhe ukljuci konfiguraciju za CORS iz WebConfig klase
				.cors().and()

				// umetni custom filter TokenAuthenticationFilter kako bi se vrsila provera JWT
				// tokena umesto cistih korisnickog imena i lozinke (koje radi
				// BasicAuthenticationFilter)
				.addFilterBefore(new TokenAuthenticationFilter(tokenUtils, customUserDetailsServiceImpl),
						BasicAuthenticationFilter.class);

		// zbog jednostavnosti primera ne koristimo Anti-CSRF token
		// (https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
		http.csrf().disable();
	}

	// Definisanje konfiguracije koja utice na generalnu bezbednost aplikacije
	@Override
	public void configure(WebSecurity web) throws Exception {
		// Autentifikacija ce biti ignorisana ispod navedenih putanja (kako bismo
		// ubrzali pristup resursima)
		// Zahtevi koji se mecuju za web.ignoring().antMatchers() nemaju pristup
		// SecurityContext-u

		// Dozvoljena POST metoda na ruti api/auth/login, za svaki drugi tip HTTP metode
		// greska je 401 Unauthorized
		web.ignoring().antMatchers(HttpMethod.POST, "/api/auth/login");

		// Ovim smo dozvolili pristup statickim resursima aplikacije
		web.ignoring().antMatchers(HttpMethod.GET, "/", "/webjars/**", "/*.html", "/**/*.png", "/**/*.jpg", "favicon.ico", "/**/*.html",
				"/**/*.css", "/**/*.js");
	}
}
