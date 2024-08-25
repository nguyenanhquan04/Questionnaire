import {
  LoginFormPage,
  ProConfigProvider,
} from "@ant-design/pro-components";
import { Tabs, theme } from "antd";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuthToken } from "../../helper/Helpers";
import './index.scss';
import SignInForm from './signInForm';

const pageConfig = {
    bgImage:"https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp",
    logoName:"/logo.jpg",
    bgVideo:"https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
}

const Login = ({onLogin}) => {
    const [loginType, setLoginType] = useState("signIn");

    const { token } = theme.useToken();

    const navigate = useNavigate();

    useEffect(() => {
        checkAuthToken(navigate);
    }, [navigate]);

    const signInFormRef = useRef();

    const handleSubmit = async () => {
        switch(loginType){
            case "signIn": 
                if (signInFormRef.current) {
                    signInFormRef.current.handleSignin();
                }
                return;
            case "signUp":
            case "forgotPassword":
            default: return null
        }
        
    };

    const onChangeTab = (activeKey) => {
        setLoginType(activeKey);
        setOtpSent(false);
    }

    const renderTab = ()=>{
        return <Tabs
            centered
            activeKey={loginType}
            onChange={onChangeTab}
        >
            <Tabs.TabPane key={"signIn"} tab={"Sign In"} />
            <Tabs.TabPane key={"signUp"} tab={"Sign Up"} />
            {/* <Tabs.TabPane key={"forgotPassword"} tab={"Forgot Password"} /> */}
        </Tabs>
    }

    const renderFormContent = ()=>{
        switch(loginType){
            case "signIn": return <SignInForm ref={signInFormRef} onLogin={onLogin}/>
            case "signUp":
            case "forgotPassword":
            default: return null
        }
    }

    const renderLoginForm = ()=>{
        const containerConfig = {
            backgroundColor: "rgba(0, 0, 0,0.65)",
            backdropFilter: "blur(4px)",
        }
        const activityConfig = {
            style: {
                boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
                color: token.colorTextHeading,
                borderRadius: 8,
                backgroundColor: "rgba(255,255,255,0.25)",
                backdropFilter: "blur(4px)",
            },
            title: "Welcome to Amazing Tech",
            subTitle: "Please sign in to continue",
        }
        return <LoginFormPage
            submitter={{
                searchConfig: { submitText: "OK" },
                submitButtonProps: {
                    onClick: handleSubmit, // Handle form submission
                },
            }}
            backgroundImageUrl={pageConfig.bgImage}
            logo={pageConfig.logoName}
            backgroundVideoUrl={pageConfig.bgVideo}
            title="Amazing Tech"
            containerStyle={containerConfig}
            subTitle="Questionnaire For Intern"
            activityConfig={activityConfig}
        >
            {renderTab()}
            {renderFormContent()}
        </LoginFormPage>
    }

    return (
        <div className="sign-in-container child-centered">
            {renderLoginForm()}
        </div>
    );
};


export default ({onLogin}) => {
  return (
    <ProConfigProvider dark>
      <Login onLogin={ onLogin }/>
    </ProConfigProvider>
  );
};
