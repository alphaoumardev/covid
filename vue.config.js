module.exports=
{
    devServer:
    {   port:2000,
        proxy:
        {
            '/api':
            {
                target:'http://localhost:8000/',
                changeOrigin:true,
                pathRewrite:
                {'^/api':''}
            }
        }
    }
}