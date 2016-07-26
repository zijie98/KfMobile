<?php
namespace app\controller;

use think\Controller;
use think\Response;
use think\exception\HttpResponseException;

/**
 * 控制器基类
 * @package app\controller
 */
class Base extends Controller
{
    /**
     * 初始化
     */
    protected function _initialize()
    {
        if (config('site_close')) {
            error(config('site_close_msg'));
        }
        if (!cookie(config('kf_cookie_prefix') . 'winduser')) {
            $result = action('Login/index', ['isRemote' => false, 'jumpUrl' => request()->url()]);
            $response = Response::create($result, 'html');
            throw new HttpResponseException($response);
        }
    }
}
