import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormText,
} from "@ant-design/pro-components";
import { Tabs, message, theme } from "antd";
import { useState } from "react";

const Page = () => {
  const [loginType, setLoginType] = useState("signIn");
  const [otpSent, setOtpSent] = useState(false); // State to track if OTP is sent
  const [email, setEmail] = useState(""); // State to track the email input
  const { token } = theme.useToken();

  const handleGetCaptcha = async () => {
    if (!email) {
      message.error("Please enter your email before sending the OTP!");
      return;
    }
    message.success("OTP is sent to your email");
    setOtpSent(true); // Set OTP sent status to true
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
        submitter={{ searchConfig: { submitText: "Login" } }}
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
          <Tabs.TabPane key={"forgotPassword"} tab={"Forgot Password"} />
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
            />
          </>
        )}

        {loginType === "signUp" && (
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
                />
                <ProFormText.Password
                  name="reenter-new-password"
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
                  placeholder={"Re-enter New Password"}
                  rules={[
                    {
                      required: true,
                      message: "Re-enter New Password is required!",
                    },
                  ]}
                />
              </>
            )}
          </>
        )}
      </LoginFormPage>
    </div>
  );
};

export default () => {
  return (
    <ProConfigProvider dark>
      <Page />
    </ProConfigProvider>
  );
};
