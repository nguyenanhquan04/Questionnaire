import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  ProFormText,
} from "@ant-design/pro-components";
import { useState, forwardRef, useImperativeHandle } from "react";
import { getRules } from "./validation";
import { login } from '../../api/AuthService';
import { message, theme } from "antd";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes";

const SignInForm = forwardRef((props, ref) => {
    const navigate = useNavigate()
    const { token } = theme.useToken();
    const [signInFormData, setSignInFormData] = useState({ email  :"", password: "" }); // State to track the email input

    const onChangeInputField = (e) =>{
        const VALUE = e.target.value
        const NAME = e.target.id
        setSignInFormData(prevData =>{
            return {
                ...prevData,
                [NAME]: VALUE
            }
        })
    }

    const handleSignin = async ()=>{
        try {
            const user = await login(signInFormData.email, signInFormData.password);
            const authToken = user.data.token;
    
            if (user) {
              localStorage.setItem("authToken", authToken);
              message.success("Login successful!");
    
              const decodedToken = jwtDecode(authToken);
      
              // eslint-disable-next-line react/prop-types
              props.onLogin(authToken);
      
              if (decodedToken.role === "ADMIN") {
                navigate(ROUTES.adminPage); 
              } else if (decodedToken.role === "INTERN") {
                navigate(ROUTES.internPage); 
              }
            }        
          } catch (error) {
            if (error.response && error.response.status === 403) {
              message.error("Username or password is incorrect or account does not exist");
            } else {
              message.error("An unexpected error occurred. Please try again.");
            }
            console.error("Login failed", error);
          }
    }

    useImperativeHandle(ref, () => ({
        handleSignin
    }));

    return <div className="form-content">
        <ProFormText
            name="email"
            fieldProps={{
                size: "large",
                prefix: (
                    <UserOutlined
                        style={{
                            color: token.colorText,
                        }}
                        className={"prefixIcon"}
                    />
                ),
            }}
            placeholder={"Email"}
            rules={getRules().signInForm().email}
            onChange={onChangeInputField} // Update email state on change
        />
        <ProFormText.Password
            name="password"
            fieldProps={{
                size: "large",
                prefix: (
                    <LockOutlined
                        style={{
                            color: token.colorText,
                        }}
                        className={"prefixIcon"}
                    />
                ),
            }}
            placeholder={"Password"}
            rules={getRules().signInForm().password}
            onChange={onChangeInputField} // Update password state on change
        />
    </div>
})

SignInForm.displayName = 'SignInForm';

export default SignInForm;
