import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { credential, login } from '../redux/actions/AccountActions/accountAction'

const Test = (props: any) =>{

    const login = ()=>{
        console.log("inside")
        
        
        //props.login("simonlim898@hotmail.com")
    }

    useEffect(() => {

    }, [props])
    return (
        <div>
            <div>Acces Token {props.account.loading ? (<p>loading</p>):(<p>{props.account.access_token}</p>)}</div>
            <div>{props.account.loading.toString()}</div>
            <button onClick={login}>Login</button>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        account: state.account
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        login: (credential: credential) => dispatch(login(credential))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test)