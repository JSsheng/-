//!点击去注册账号让 登录框隐藏，注册框显示
$("#link_reg").click(() => {
    $(".login-box").hide();
    $(".reg-box").show();
});

//! 点击去登录让 注册框隐藏，登录框显示
$("#link_login").click(() => {
    $(".login-box").show();
    $(".reg-box").hide();
});

const form = layui.form

const layer = layui.layer;

//! 正则表达式
form.verify({
    repass: value => {
        const pwd = $('.reg-box [name=password' ).val()
        if (pwd !== value) return "两次密码不一致"
    },

    pass: [
        /^[\S]{6,12}$/
        , '密码必须6到12位，且不能出现空格'
    ]
});

// !注册事件
$('#form_reg').on('submit', function (e) {
    const data = $(this).serialize()
    e.preventDefault()
    $.ajax({
        type: 'POST',
        url: '/api/reguser',
        data,
        success: res => {
            const { message, status } = res
            if (status !== 0) return layer.msg(message)
            $('#link_login').click()
        }
    })
})

// !登录事件
$('#form_login').on('submit',function(e) {
    e.preventDefault()
    const data = $(this).serialize()
    $.ajax({
        type:'POST',
        url:'/api/login',
        data,
        success:res => {
            const {message , status, token} = res
            if(status !== 0) return layer.msg(message)
            localStorage.setItem('token', token)
            location.href = '/index.html'
        }
    })
})

