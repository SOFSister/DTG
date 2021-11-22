package DTGservlet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import db.DBConnection;
import org.apache.commons.codec.digest.DigestUtils;

import java.io.IOException;
import java.io.PrintWriter;
import java.security.MessageDigest;
import java.sql.*;
import java.util.*;
import java.util.Date;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.sql.DataSource;

@WebServlet("/html/ChangeUserInfoDataBaseServlet")
public class ChangeUserInfoDataBaseServlet extends HttpServlet{
    private static final long serialVersionUID = 1L;
    public ChangeUserInfoDataBaseServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        doPost(request, response);
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        String action=request.getParameter("action");
        if(action.equals("add")){
            add(request,response);
        }
        else if(action.equals("selectID")){
            selectID(request,response);
        }
    }
    protected void add(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            response.setContentType("application/json");
            request.setCharacterEncoding("UTF-8");
            String DtgID=request.getParameter("DtgID");
            String LastName=request.getParameter("LastName");
            String FirstName=request.getParameter("FirstName");
            String Province=request.getParameter("Province");
            String City=request.getParameter("City");
            String PhoneNumber=request.getParameter("PhoneNumber");
            String IDStatus="true";
            String Password= DigestUtils.shaHex(request.getParameter("PassWord"));
            //判断账号是否重复
            DBConnection dbConnection=new DBConnection();
            String sql="select * from userinfo where DtgID='"+DtgID+"'";
            ArrayList<Map<String,String>>rs=dbConnection.queryForList(sql);
            int rsIDSize=rs.size();
            //判断电话是否重复
            sql="select * from userinfo where PhoneNumber='"+PhoneNumber+"'";
            rs=dbConnection.queryForList(sql);
            int rsPhoneNumberSize=rs.size();
            JsonObject jsonContainer =new JsonObject();
            if(rsIDSize!=0){
                jsonContainer.addProperty("hasID",true);
            }
            else{
                jsonContainer.addProperty("hasID",false);
            }
            if(rsPhoneNumberSize!=0){
                jsonContainer.addProperty("hasPhoneNumber",true);
            }
            else {
                jsonContainer.addProperty("hasPhoneNumber",false);
            }
            if(rsIDSize==0&&rsPhoneNumberSize==0){
                sql="insert into userinfo(DtgID,LastName,FirstName,Province,City,PhoneNumber,IDStatus,Password) values ('"+DtgID+"','"+LastName+"','"+FirstName+"','"+Province+"','"+City+"','"+PhoneNumber+"','"+IDStatus+"','"+Password+"')";
                dbConnection.update(sql);
            }
            dbConnection.close();
            PrintWriter writer = response.getWriter();
            writer.write(new Gson().toJson(jsonContainer));
            writer.flush();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
    protected void selectID(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            response.setContentType("application/json");
            request.setCharacterEncoding("UTF-8");
            String LastName=request.getParameter("LastName");
            String FirstName=request.getParameter("FirstName");
            String PhoneNumber=request.getParameter("PhoneNumber");
            DBConnection dbConnection=new DBConnection();
            String sql="select * from userinfo where PhoneNumber='"+PhoneNumber+"' and LastName='"+LastName+"' and FirstName='"+FirstName+"'";
            ArrayList<Map<String,String>> rs=dbConnection.queryForList(sql);
            int rsSize=rs.size();
            JsonObject jsonContainer =new JsonObject();
            if(rsSize>0){
                jsonContainer.addProperty("hasID",true);
                jsonContainer.addProperty("ID",rs.get(0).get("DtgID"));
            }
            else{
                jsonContainer.addProperty("hasID",false);
            }
            dbConnection.close();
            PrintWriter writer = response.getWriter();
            writer.write(new Gson().toJson(jsonContainer));
            writer.flush();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
}
