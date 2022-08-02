import React, { Component } from 'react';
import { login } from '../../util/APIUtils';
import './Login.css';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants';

import { Form, Input, Button, Icon, notification } from 'antd';
const FormItem = Form.Item;

class Login extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm)
        return (

            <div className="login-container">
                <h1 className="page-title">Войти</h1>
                <div className="login-content">
                    <AntWrappedLoginForm onLogin={this.props.onLogin} />
                </div>
            </div>
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values);
                login(loginRequest)
                    .then(response => {
                        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                        this.props.onLogin();
                    }).catch(error => {
                        if (error.status === 401) {
                            notification.error({
                                message: 'ГИС',
                                description: 'Ваше имя пользователя или пароль неверны. Пожалуйста, попробуйте еще раз!'
                            });
                        } else {
                            notification.error({
                                message: 'ГИС',
                                description: error.message || 'Извини! Что-то пошло не так. Пожалуйста, попробуйте еще раз!'
                            });
                        }
                    });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('usernameOrEmail', {
                        rules: [{ required: true, message: 'Пожалуйста, введите ваше имя пользователя или адрес электронной почты!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" />}
                            size="large"
                            name="usernameOrEmail"
                            placeholder="Логин или Email" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Пожалуйста, введите Ваш пароль!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" />}
                            size="large"
                            name="password"
                            type="password"
                            placeholder="Пароль" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">Войти</Button>
                    или <Link to="/signup">Зарегистрируйтесь сейчас!</Link>
                </FormItem>
            </Form>
        );
    }
}


export default Login;