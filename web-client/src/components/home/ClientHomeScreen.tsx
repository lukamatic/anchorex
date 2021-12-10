function ClientHomeScreen() {
	const user = {
		firstName: 'Petar',
		lastName: 'Obradovic',
	};
	return (
		<div>
			<div>
				<h1>Hi, {user.firstName}!</h1>
			</div>
		</div>
	);
}

export default ClientHomeScreen;
