import {useState} from "react";
import axios from "axios";
import {setCurrentUser} from "~/store/auth/actions.tsx";
import {userAPI} from "~/url.tsx";

export default function Login() {
    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const handleChange = event => {
        const {name, value} = event.target;
        setValues({
            ...values,
            [name]: value
        });
    }
    const handleSubmit = async event => {
        event.preventDefault();
        const {data} = await axios.post(`${userAPI}/login`, {
            email: values.email,
            password: values.password
        }, {withCredentials: true});
        if(data.succeded) {
            setCurrentUser(data.user);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form className="flex flex-col gap-4 items-center" onSubmit={handleSubmit}>
                <input onChange={handleChange} name="email" value={values.email} required className="outline-none border p-1 rounded" type="email" placeholder="E-Mail"/>
                <input onChange={handleChange} name="password" required value={values.password} className="outline-none border p-1 rounded" type="password" placeholder="Password"/>
                <button disabled={!values.email || !values.password} type="submit" className="rounded-lg bg-green-700 w-full py-2 text-white disabled:bg-red-400">Login</button>
            </form>
        </div>
    )
}