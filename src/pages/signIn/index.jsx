import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormText,
} from "@ant-design/pro-components";
import { Tabs, message, theme } from "antd";
import { useState } from "react";
import { login, register } from '../../api/AuthService';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes";

const Login = ({onLogin}) => {
  const [loginType, setLoginType] = useState("signIn");
  const [otpSent, setOtpSent] = useState(false); // State to track if OTP is sent
  const [email, setEmail] = useState(""); // State to track the email input
  const [fullName, setFullName] = useState(""); // State to track the full name input
  const [password, setPassword] = useState(""); // State to track the password input
  const [reenterPassword, setReenterPassword] = useState(""); // State to track the re-entered password input
  const { token } = theme.useToken();
  const navigate = useNavigate();

  const handleGetCaptcha = async () => {
    if (!email) {
      message.error("Please enter your email before sending the OTP!");
      return;
    }
    message.success("OTP is sent to your email");
    setOtpSent(true); // Set OTP sent status to true
  };

  const handleSubmit = async () => {
    if (loginType === "signIn") {
      try {
        const user = await login(email, password);
        const authToken = user.data.token;

        if (user) {
          localStorage.setItem("authToken", JSON.stringify(authToken));
          message.success("Login successful!");

          const decodedToken = jwtDecode(authToken);
  
          // Notify the Header component about the login
          onLogin(authToken);
  
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
    } else if (loginType === "signUp") {
      if (password !== reenterPassword) {
        message.error("Passwords do not match!");
        return;
      }
      try {
        await register(fullName, email, password);
        message.success("Registration successful!");
        setLoginType("signIn");
      } catch (error) {
        message.error("Registration failed, please try again.");
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "75vh",
        display: "flex",  // Center the content
        justifyContent: "center",  // Horizontally center
        alignItems: "center",      // Vertically center
      }}
    >
      <LoginFormPage
        submitter={{
          searchConfig: { submitText: "OK" },
          submitButtonProps: {
            onClick: handleSubmit, // Handle form submission
          },
        }}
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        logo="/logo.jpg"
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title="Amazing Tech"
        containerStyle={{
          backgroundColor: "rgba(0, 0, 0,0.65)",
          backdropFilter: "blur(4px)",
        }}
        subTitle="Questionnaire For Intern"
        activityConfig={{
          style: {
            boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
            color: token.colorTextHeading,
            borderRadius: 8,
            backgroundColor: "rgba(255,255,255,0.25)",
            backdropFilter: "blur(4px)",
          },
          title: "Welcome to Amazing Tech",
          subTitle: "Please sign in to continue",
        }}
        actions={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          ></div>
        }
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => {
            setLoginType(activeKey);
            setOtpSent(false); // Reset OTP sent status on tab change
          }}
        >
          <Tabs.TabPane key={"signIn"} tab={"Sign In"} />
          <Tabs.TabPane key={"signUp"} tab={"Sign Up"} />
          {/* <Tabs.TabPane key={"forgotPassword"} tab={"Forgot Password"} /> */}
        </Tabs>

        {loginType === "signIn" && (
          <>
            <ProFormText
              name="username"
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
              rules={[
                {
                  required: true,
                  message: "Email is required!",
                },
              ]}
              onChange={(e) => setEmail(e.target.value)} // Update email state on change
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
              rules={[
                {
                  required: true,
                  message: "Password is required!",
                },
              ]}
              onChange={(e) => setPassword(e.target.value)} // Update password state on change
            />
          </>
        )}

        {loginType === "signUp" && (
          <>
            <ProFormText
              name="fullName"
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
              placeholder={"Full Name"}
              rules={[
                {
                  required: true,
                  message: "Full name is required!",
                },
              ]}
              onChange={(e) => setFullName(e.target.value)} // Update full name state on change
            />
            <ProFormText
              name="username"
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
              rules={[
                {
                  required: true,
                  message: "Email is required!",
                },
              ]}
              onChange={(e) => setEmail(e.target.value)} // Update email state on change
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
              rules={[
                {
                  required: true,
                  message: "Password is required!",
                },
              ]}
              onChange={(e) => setPassword(e.target.value)} // Update password state on change
            />
            <ProFormText.Password
              name="reenter-password"
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
              placeholder={"Re-enter Password"}
              rules={[
                {
                  required: true,
                  message: "Re-enter Password is required!",
                },
              ]}
              onChange={(e) => setReenterPassword(e.target.value)} // Update re-enter password state on change
            />
          </>
        )}

        {loginType === "forgotPassword" && (
          <>
            <ProFormText
              name="username"
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
              rules={[
                {
                  required: true,
                  message: "Email is required!",
                },
              ]}
              onChange={(e) => setEmail(e.target.value)} // Update email state on change
            />
            <ProFormCaptcha
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
              captchaProps={{
                size: "large",
              }}
              placeholder={"OTP"}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count}${"s"}`;
                }
                return "Send OTP";
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: "OTP is required!",
                },
              ]}
              onGetCaptcha={handleGetCaptcha} // Check email before sending OTP
            />
            {otpSent && (
              <>
                <ProFormText.Password
                  name="new-password"
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
                  placeholder={"New Password"}
                  rules={[
                    {
                      required: true,
                      message: "New Password is required!",
                    },
                  ]}
                  onChange={(e) => setPassword(e.target.value)} // Update password state on change
                />
                <ProFormText.Password
                  name="reenter-password"
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
                  placeholder={"Re-enter Password"}
                  rules={[
                    {
                      required: true,
                      message: "Re-enter Password is required!",
                    },
                  ]}
                  onChange={(e) => setReenterPassword(e.target.value)} // Update re-enter password state on change
                />
              </>
            )}
          </>
        )}
      </LoginFormPage>
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
