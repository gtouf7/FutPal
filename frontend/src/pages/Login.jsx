export default function Login() {
    return(
        <>
            <h1>FUTPAL</h1>
            <p>Login to prepare for your next match!</p>
            <form method="post">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" />
                <label for="password">Password</label>
                <input type="password" id="password" name="password" />
                <input type="submit" />
            </form>
        </>
    );
}