package DTGadmservlet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import db.DBConnection;
import org.apache.commons.codec.digest.DigestUtils;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.*;
import java.util.Date;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/html/AdmUserLogin")
public class AdmUserLogin extends HttpServlet{
    private static final long serialVersionUID = 1L;
    public AdmUserLogin() {
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
        try {
            response.setContentType("application/json");
            request.setCharacterEncoding("UTF-8");
            String AdmID=request.getParameter("AdmID");
            String Password= request.getParameter("PassWord");
            DBConnection dbConnection=new DBConnection();
            String sql="select * from adminfo where DtgAdmID='"+AdmID+"' and Password='"+Password+"'";
            ArrayList<Map<String,String>> rs=dbConnection.queryForList(sql);
            int rsSize=rs.size();
            JsonObject jsonContainer =new JsonObject();
            if(rsSize>0){
                jsonContainer.addProperty("isLogin",true);
            }
            else{
                jsonContainer.addProperty("isLogin",false);
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

