package DTGservlet;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import db.DBConnection;
import products.Product;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.text.SimpleDateFormat;
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

@WebServlet({"/OrderListInfoServlet","/html/OrderListInfoServlet"})
public class OrderListInfoServlet extends HttpServlet{
    private static final long serialVersionUID = 1L;
    public OrderListInfoServlet() {
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
        if(action.equals("submitOrders")){
            submitOrders(request,response);
        }
        else if(action.equals("deletOrders")){
            deletOrders(request,response);
        }
    }
    protected void submitOrders(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            request.setCharacterEncoding("UTF-8");
            String DtgID=request.getParameter("DtgID");
            String name=request.getParameter("name");
            String need=request.getParameter("need");
            Date date = new Date();
            SimpleDateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd :hh:mm:ss");
            String time=dateFormat.format(date);
            DBConnection dbConnection=new DBConnection();
            String sql="insert into orderlistinfo(DtgID,submitTime,mainMsg,productname) values('"+DtgID+"','"+time+"','"+need+"','"+name+"')";
            //System.out.println(sql);
            dbConnection.update(sql);
            dbConnection.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
    protected void deletOrders(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            request.setCharacterEncoding("UTF-8");
            DBConnection dbConnection=new DBConnection();
            String sql="select * from orderlistinfo order by submitTime";
            ArrayList<Map<String,String>> rs=dbConnection.queryForList(sql);
            if(rs.size()!=0){
                int aimOrderId= Integer.parseInt(rs.get(0).get("id"));
                sql="delete from orderlistinfo where id="+aimOrderId;
                dbConnection.update(sql);
                dbConnection.close();
            }
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
}
