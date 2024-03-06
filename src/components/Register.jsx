import { useState } from "react";
import { Form } from "react-router-dom";

export const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    return (
        <Form method="post">
            <div>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor='password'>Пароль</label>
                <input type='password' id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
                <label htmlFor='firstName'>Имя</label>
                <input type='text' id='firstName' name='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div>
                <label htmlFor='lastName'>Фамилия</label>
                <input type='text' id='lastName' name='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div>
            <input type='submit' id='submit'/>
            </div>
        </Form>
    )
}