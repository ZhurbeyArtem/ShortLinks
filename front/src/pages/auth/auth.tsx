import { useState } from "react";

import { useDispatch, } from "react-redux";

import { StyledInput } from "../../components/input";
import { authApi } from "./store";
import { IAuth } from "./interface";
import { notify } from "../../hooks/notification";
import { Wrapper } from "../../components/wrapper";
import { StyledButton } from "../../components/btn";
import { setCredentials } from "../../services/userSlicer";
import { useNavigate } from "react-router-dom";


export const Auth = () => {
  const dispatch = useDispatch()
  const [logUser] = authApi.useLoginMutation()
  const [regUser] = authApi.useRegistrationMutation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const login = async (data: IAuth) => {
    try {

      const result: any = await logUser(data)
      if (result.error !== undefined) {
        notify(result.error.data.message)
        return;
      }
      dispatch(setCredentials({ token: result.data.token }))
      notify("Success")
      navigate('/links')
    } catch (e: any) {
      notify(e)
    }

  }

  const registration = async (data: IAuth) => {
    try {
      const result: any = await regUser(data)
      if (result.error !== undefined) {
        notify(result.error.data.message)
        return;
      }
      dispatch(setCredentials({ token: result.data.token }))
      notify("Success")
      navigate('/links')
    } catch (e: any) {
      notify(e)
    }


  }

  return <Wrapper >
    <StyledInput type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
    <StyledInput type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
    <StyledButton type="submit" onClick={() => login({ email, password })} >Login</StyledButton>
    <StyledButton type="submit" onClick={() => registration({ email, password })}>Registration</StyledButton>
  </Wrapper>;
}

