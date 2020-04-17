<template>
    <div class="swal2-icon swal2-error swal2-animate-error-icon" style="display: flex;">
        <span class="swal2-x-mark">
            <span class="swal2-x-mark-line-left"></span>
            <span class="swal2-x-mark-line-right"></span>
        </span>
    </div>
</template>

<script>
  export default {
    name: "CYFailureIcon"
  }
</script>

<style scoped>
    @-webkit-keyframes swal2-animate-error-x-mark{
        0%{
            margin-top:1.625em;
            -webkit-transform:scale(.4);
            transform:scale(.4);
            opacity:0
        }
        50%{
            margin-top:1.625em;
            -webkit-transform:scale(.4);
            transform:scale(.4);
            opacity:0
        }
        80%{
            margin-top:-.375em;
            -webkit-transform:scale(1.15);
            transform:scale(1.15)
        }
        100%{
            margin-top:0;
            -webkit-transform:scale(1);
            transform:scale(1);
            opacity:1
        }
    }
    @keyframes swal2-animate-error-x-mark{
        0%{
            margin-top:1.625em;
            -webkit-transform:scale(.4);
            transform:scale(.4);
            opacity:0
        }
        50%{
            margin-top:1.625em;
            -webkit-transform:scale(.4);
            transform:scale(.4);
            opacity:0
        }
        80%{
            margin-top:-.375em;
            -webkit-transform:scale(1.15);
            transform:scale(1.15)
        }
        100%{
            margin-top:0;
            -webkit-transform:scale(1);
            transform:scale(1);
            opacity:1
        }
    }
    @-webkit-keyframes swal2-animate-error-icon{
        0%{
            -webkit-transform:rotateX(100deg);
            transform:rotateX(100deg);
            opacity:0
        }
        100%{
            -webkit-transform:rotateX(0);
            transform:rotateX(0);
            opacity:1
        }
    }
    @keyframes swal2-animate-error-icon{
        0%{
            -webkit-transform:rotateX(100deg);
            transform:rotateX(100deg);
            opacity:0
        }
        100%{
            -webkit-transform:rotateX(0);
            transform:rotateX(0);
            opacity:1
        }
    }
    .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{
        top:.875em;
        width:1.375em
    }
    .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{
        left:.3125em
    }
    .swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{
        right:.3125em
    }
    .swal2-icon{
        position:relative;
        justify-content:center;
        width:5em;
        height:5em;
        margin:1.25em auto 1.875em;
        border:.25em solid transparent;
        border-radius:50%;
        line-height:5em;
        cursor:default;
        box-sizing:content-box;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        zoom:normal
    }
    .swal2-icon.swal2-error{
        border-color:#f27474
    }
    .swal2-icon.swal2-error .swal2-x-mark{
        position:relative;
        flex-grow:1
    }
    .swal2-icon.swal2-error [class^=swal2-x-mark-line]{
        display:block;
        position:absolute;
        top:2.3125em;
        width:2.9375em;
        height:.3125em;
        border-radius:.125em;
        background-color:#f27474
    }
    .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{
        left:1.0625em;
        -webkit-transform:rotate(45deg);
        transform:rotate(45deg)
    }
    .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{
        right:1em;
        -webkit-transform:rotate(-45deg);
        transform:rotate(-45deg)
    }
    [class^=swal2]{
        -webkit-tap-highlight-color:transparent
    }
    .swal2-animate-error-icon{
        -webkit-animation:swal2-animate-error-icon .5s;
        animation:swal2-animate-error-icon .5s
    }
    .swal2-animate-error-icon .swal2-x-mark{
        -webkit-animation:swal2-animate-error-x-mark .5s;
        animation:swal2-animate-error-x-mark .5s
    }
</style>