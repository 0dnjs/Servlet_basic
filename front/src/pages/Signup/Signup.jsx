import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SInputLayout = css`
    margin-bottom: 15px;
    width: 60%;
    height: 40px;

    & > input {
        width:100%;
        height: 100%;
        text-align: center;
    }
`;

function Signup(props) {
    const navigate = useNavigate();

    const [ signupUser, setSignupUser ] = useState({
        username: "",
        password: "",
        name: "",
        email: ""
    });

    const handleInputChange = (e) => {
        setSignupUser({
            ...signupUser,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitClick = () => {
        // 회원가입 요청
        const option ={
            params: {
                username: signupUser.username
            }
        }

        const signup = async () => {
            let response = await axios.get("http://localhost:8080/servlet_study_yerim/auth/signup/duplicate/username", option);
            if(response.data) {
                alert("이미 사용중인 사용자이름입니다.");
                return;
            }

            try {
                response = await axios.post("http://localhost:8080/servlet_study_yerim/auth/signup", signupUser);
                if(response.data) {
                    alert("회원가입 성공");
                    navigate("/signin");
                }else {
                    throw new Error(response);
                }
            }catch(error) {
                console.log(error);
            }
        }

        signup();
    }

    return (
        <>
            <h1>회원가입</h1>
            <div css={SInputLayout}>
                <input type="text" name='username' placeholder='username' onChange={handleInputChange}/>
            </div>
            <div css={SInputLayout}>
                <input type="password" name='password' placeholder='password' onChange={handleInputChange}/>
            </div>
            <div css={SInputLayout}>
                <input type="text" name='name' placeholder='name' onChange={handleInputChange}/>
            </div>
            <div css={SInputLayout}>
                <input type="text" name='email' placeholder='email' onChange={handleInputChange}/>
            </div>
            <div>
                <button onClick={handleSubmitClick}>가입하기</button>
            </div>
        </>
    );
}

export default Signup;