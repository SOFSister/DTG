package DTGservlet;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.io.IOException;
import java.io.PrintWriter;
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

@WebServlet("/html/CheckCodeServlet")
public class CheckCodeServlet extends HttpServlet{
    private static final long serialVersionUID = 1L;
    public CheckCodeServlet() {
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
            HttpSession session = request.getSession();
            request.setCharacterEncoding("UTF-8");
            response.setContentType("application/json");
            String inputCode=request.getParameter("code");
            String inputEmailCode=request.getParameter("EmailCode");
            String inputEmailID=request.getParameter("EmailID");
            String code=session.getAttribute("code").toString();
            String emailCode=session.getAttribute("EmailCode").toString();
            String emailID=session.getAttribute("EmailID").toString();
            JsonObject jsonContainer =new JsonObject();
            if(inputCode.equals(code)){
                jsonContainer.addProperty("imgCode",true);
            }
            else{
                jsonContainer.addProperty("imgCode",false);
            }
            if(inputEmailCode.equals(emailCode)&&inputEmailID.equals(emailID)){
                jsonContainer.addProperty("emailCode",true);
            }
            else{
                jsonContainer.addProperty("emailCode",false);
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
