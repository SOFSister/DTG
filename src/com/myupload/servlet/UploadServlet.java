package com.myupload.servlet;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import db.DBConnection;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;


@WebServlet("/html/UploadServlet")
public class UploadServlet extends HttpServlet {

    private static final long serialVersionUID = 7042756416806244618L;

    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doPost(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String fileDir = getServletContext().getRealPath("/upload");
        //检测目录是否存在，如果不存在就创建
        File dirUpload=new File(fileDir);
        if(!dirUpload.exists()){
            dirUpload.mkdirs();
        }
        System.out.println("fileDir: " + fileDir);
        // 指定上传文件的保存地址
        String message = "文件上传成功";
        String address = "";
        String filename=null;//文件名
        String filepath=null;
        String productName = null;
        int productPrice=0;
        int productEvaluation=0;
        String productStatus=null;

        int i=0;
        request.setCharacterEncoding("UTF-8");
        if (ServletFileUpload.isMultipartContent(request)) { // 判断是否是上传文件
            DiskFileItemFactory factory = new DiskFileItemFactory();
            factory.setSizeThreshold(20 * 1024); // 设置内存中允许存储的字节数
            ServletFileUpload upload = new ServletFileUpload(factory); // 创建新的上传文件句柄

            int size = 5 * 1024 * 1024; // 指定上传文件的大小
            List formlists = null; // 创建保存上传文件的集合对象
            try {
                formlists = upload.parseRequest(request); // 获取上传文件集合
            } catch (FileUploadException e) {
                e.printStackTrace();
            }
            Iterator iter = formlists.iterator(); // 获取上传文件迭代器
            while (iter.hasNext()) {
                FileItem formitem = (FileItem) iter.next(); // 获取每个上传文件
                if (!formitem.isFormField()) { // 忽略不是上传文件的表单域
                    String name = formitem.getName(); // 获取上传文件的名称
                    if (formitem.getSize() > size) { // 如果上传文件大于规定的上传文件的大小
                        message = "您上传的文件太大，请选择不超过5M的文件";

                        break; // 退出程序
                    }
                    String adjunctsize = new Long(formitem.getSize())
                            .toString(); // 获取上传文件的大小
                    if ((name == null) || (name.equals(""))
                            && (adjunctsize.equals("0"))) // 如果上传文件为空
                        continue; // 退出程序
                    //获取当前图片的数量
                    DBConnection dbConnection=new DBConnection();
                    String sql="select * from files";
                    ArrayList<Map<String,String>> rs=dbConnection.queryForList(sql);
                    filename = String.valueOf(rs.size())+"_"+name.substring(name.lastIndexOf("\\") + 1,
                            name.length());

                    address = fileDir + "\\" + filename; // 创建上传文件的保存地址
                    File saveFile = new File(address); // 根据文件保存地址，创建文件
                    try {
                        formitem.write(saveFile); // 向文件写数据
                        filepath="upload/" + filename;

                        //图保存到数据库files
                        sql="insert into files(FileName,FilePath) values('"+filename+"','"+filepath+"')";
                        i=dbConnection.update(sql);
                        dbConnection.close();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
                else{
                    //获取该表单元素内容（value值）
                    String allvalue = formitem.getFieldName();
                    //表单的name属性而不是value值
                    if (allvalue.equals("name")) {
                        productName = formitem.getString("utf-8");
                    }
                    else if (allvalue.equals("price")) {
                        productPrice = Integer.parseInt(formitem.getString("utf-8"));
                    }
                    else if (allvalue.equals("evaluation")) {
                        productEvaluation = Integer.parseInt(formitem.getString("utf-8"));
                    }
                    else if (allvalue.equals("status")) {
                        productStatus = formitem.getString("utf-8");
                    }
                }
            }
            //商品保存到数据库product info
            DBConnection dbConnection=new DBConnection();
            String sql="insert into productinfo(ProductName,ProductPrice,ProductEvaluation,ProductImgName,ProductStatus) values('"+productName+"',"+productPrice+","+productEvaluation+",'"+filename+"','"+productStatus+"')";
            dbConnection.update(sql);
            dbConnection.close();
        }
        response.sendRedirect("admIndex.jsp");
    }

    public void init() throws ServletException {
        // Put your code here
    }

}
