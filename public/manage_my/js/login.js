$(function () {
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
    $('.form').bootstrapValidator({
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        
                    }
                }
            }
        },
          password: {
             username: {
                 validators: {
                     notEmpty: {

                     }
                 }
             }
         }
    }).on('succes.form.by',function(e){
        e.preventDefault();
    })
    $.ajax({
        url: "/employee/employeeLogin",
        data:$("form").serialize(),
        type:'post',
        success:function(backData){
            console.log(backData);
            //正确
            if(backData.success==true){
                window.location.href='./index.html';

            }else{
                //获取验证插件对象
                var validator = $("form").data('bootsrapvalidator');
                //失败
                if(backData.error==1000){
                    validator.updateStatus('username', 'IVALID','callback');
                }else if(backData.error==1001){
                    validator.updateStatus('password', 'IVALID', 'callback');
                }
            }
        }
    })
})