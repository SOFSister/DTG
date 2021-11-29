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

@WebServlet("/html/ChangeProductInfoDataBaseServlet")
public class ChangeProductInfoDataBaseServlet extends HttpServlet{
    private static final long serialVersionUID = 1L;
    public ChangeProductInfoDataBaseServlet() {
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
        if(action.equals("updateInfo")){
            updateInfo(request,response);
        }
        else if(action.equals("deleteInfo")){
            deleteInfo(request,response);
        }
    }
    protected void updateInfo(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        try {
            request.setCharacterEncoding("UTF-8");
            int ProductID= Integer.parseInt(request.getParameter("ID"));
            String ProductName= request.getParameter("ProductName");
            int ProductPrice=9999;
            if(!request.getParameter("ProductPrice").equals("")){
                ProductPrice= Integer.parseInt(request.getParameter("ProductPrice"));
            }
            int ProductEvaluation= Integer.parseInt(request.getParameter("ProductEvaluation"));
            String ProductStatus= request.getParameter("ProductStatus");
            DBConnection dbConnection=new DBConnection();
            String sql="update productinfo set ProductName='"+ProductName+"',ProductPrice="+ProductPrice+",ProductEvaluation="+ProductEvaluation+",ProductStatus='"+ProductStatus+"' where ProductID="+ProductID;
            dbConnection.update(sql);
            dbConnection.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
    protected void deleteInfo(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            request.setCharacterEncoding("UTF-8");
            int ProductID= Integer.parseInt(request.getParameter("ID"));
            DBConnection dbConnection=new DBConnection();
            String sql="delete from productinfo where ProductID="+ProductID;
            dbConnection.update(sql);
            dbConnection.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
}

