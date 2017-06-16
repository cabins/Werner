# -*- coding: utf-8 -*-
# API Views

from django.shortcuts import render, HttpResponse
from ErrorSim.models import ErrorRecord


def cms(req):
    # upload_pb(function="ErrorSim")

    return render(req, "error_sim_cms.html", {})


# 页面前端获取默认值
def get_default(req):
    api = req.GET.get("api")

    try:
        # 如果能查询的到
        er = ErrorRecord.objects.get(api=api.strip('/'))
        res = er.default_value
        if res is None:
            res = ""
        return HttpResponse(res)
    except ErrorRecord.DoesNotExist:
        return HttpResponse("")


# 页面前端获取生效值
def get_current(req):

    api = req.GET.get("api")

    try:
        # 如果能查询的到
        er = ErrorRecord.objects.get(api=api.strip('/'))
        res = er.current_value
        if not res:
            res = ""
        return HttpResponse(res)
    except ErrorRecord.DoesNotExist:
        return HttpResponse("")


def post_commit(req):
    api = req.POST.get('api').strip("/")
    code = req.POST.get('code')
    https = int(req.POST.get('https'))
    encrypt = int(req.POST.get('encrypt'))
    current_value = req.POST.get('current_value')

    # upload_pb(function="ErrorSim", action="Submit")

    if api == '':
        return HttpResponse("接口名称不能为空")

    if code == '':
        code = 200
    else:
        code = int(code)

    try:
        er = ErrorRecord.objects.get(api=api)
        er.code = code
        er.https = https
        er.encrypt = encrypt
        er.current_value = current_value
        er.save()

        return HttpResponse("更新成功")

    except ErrorRecord.DoesNotExist:
        ErrorRecord(api=api, code=code, https=https, encrypt=encrypt, current_value=current_value).save()

        return HttpResponse("新建成功")


# 客户端拿具体的接口来访问
def get_value(req):

    api = req.path

    try:
        # 如果能查询的到
        er = ErrorRecord.objects.get(api=api.strip('/'))
        if er.code == 200:
            res = "OK"
            if er.encrypt == 0:
                res = er.current_value
            if er.encrypt == 1:
                x = encrypt()
                res = x.encrypt(er.current_value).decode('utf-8')
            return HttpResponse(res)
        else:
            return HttpResponse(status=er.code)
    except:
        return HttpResponse("")
