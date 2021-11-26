package DTGservlet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

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

@WebServlet("/GetSessions")
public class GetSessions extends HttpServlet{
    private static final long serialVersionUID = 1L;
    public GetSessions() {
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
        if(action.equals("getLoginedID")){
            getLoginedID(request,response);
        }

    }
    protected void getLoginedID(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        try {
            HttpSession session = request.getSession();
            response.setContentType("application/json");
            request.setCharacterEncoding("UTF-8");
            String loginedID= (String) session.getAttribute("loginedID");
            JsonObject jsonContainer =new JsonObject();
            if(loginedID==null){
                jsonContainer.addProperty("loginedID", "");
            }
            else{
                jsonContainer.addProperty("loginedID", loginedID);
            }
            PrintWriter writer = response.getWriter();
            writer.write(new Gson().toJson(jsonContainer));
            writer.flush();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
}
