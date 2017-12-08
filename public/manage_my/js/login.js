$(function () {
    // 测试代码
    // $('button[type=submit]').click(function (event) {
    //     event.preventDefault();
    //     $.ajax({
    //         url: "/employee/employeeLogin",
    //         data: $("form").serialize(),
    //         type: 'post',
    //         success: function (backData) {
    //             console.log(backData);
    //         }
    //     })
    // })
    // 2.初始化 表单验证插件
    $('form').bootstrapValidator({
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 检验的字段
        fields: {
            username: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '用户名长度必须在6到12之间'
                    },
                    callback: {
                        message: '用户名不存在'
                    }

                }

            },
            password: {
                // 验证什么
                validators: {
                    // 非空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '用户名长度必须在6到30之间'
                    },
                    callback: {
                        message: '用户名不存在'
                    }
                }
            }
        }
    }).on('succes.form.by', function (e) {
        e.preventDefault();
        // 使用ajax提交逻辑
        console.log('你点我啦');
        // ajax提交数据
        $.ajax({
            url: "/employee/employeeLogin",
            data: $("form").serialize(),
            type: 'post',
            success: function (backData) {
                console.log(backData);
                //正确
                if (backData.success == true) {
                    window.location.href = './index.html';

                } else {
                    //获取验证插件对象
                    var validator = $("form").data('bootsrapvalidator');
                    //失败
                    if (backData.error == 1000) {
                        validator.updateStatus('username', 'IVALID', 'callback');
                    } else if (backData.error == 1001) {
                        validator.updateStatus('password', 'IVALID', 'callback');
                    }
                }
            }
        })

    })

    // 3.为重置表单绑定点击事件
    $('button[type=reset]').click(function () {
        //获取验证插件对象
        var validator = $("form").data('bootsrapvalidator');
        validato.resetForm();
    })
})