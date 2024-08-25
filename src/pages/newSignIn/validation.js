const validation = ()=>{
    
}
const getRules = ()=>{
    const signInForm = ()=>{
        return {
            email:[    
                {
                    required: true,
                    message: "Email is required!",
                },
            ],
            password:[    
                {
                    required: true,
                    message: "Password is required!",
                },
            ]
        }
    }

    return {signInForm}
}
export {getRules, validation}