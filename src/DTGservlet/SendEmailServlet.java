package DTGservlet;

import java.io.IOException;
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

@WebServlet("/html/SendEmailServlet")
public class SendEmailServlet extends HttpServlet{
    private static final long serialVersionUID = 1L;
    public SendEmailServlet() {
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
        if(action.equals("createAccount")){
            sendCode(request,response,"您正在创建 Dtg ID","EmailID","EmailCode");
        }
        else if(action.equals("changePwd")){
            sendCode(request,response,"您正在修改 Dtg ID 的密码","ChangePwdID","ChangePwdCode");
        }
        /*try {
            HttpSession session = request.getSession();
            request.setCharacterEncoding("UTF-8");
            String from="874280179@qq.com";
            String password="zjgyfvrvufxybbbe";
            String to=request.getParameter("to");
            String subject="您正在创建 Dtg ID";
            //随机类
            Random random = new Random();
            //随机产生6位验证码
            String[] codes = {"2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","U","V","W","X","Y","Z"};
            String code = "";
            for(int i=0;i<6;i++){
                String str = codes[random.nextInt(codes.length)];
                code += str;
            }
            // 将认证码存入SESSION
            session.setAttribute("EmailID", to);
            session.setAttribute("EmailCode", code);
            //填写右键内容
            String messageText="你的验证码是"+code;
            int n=from.indexOf('@');
            int m=from.length();
            String mailserver="smtp."+from.substring(n+1,m);
            Properties pro=new Properties();
            pro.put("mail.smtp.host",mailserver);
            pro.put("mail.smtp.auth","true");
            Session sess= Session.getInstance(pro);
            sess.setDebug(true);
            //新建消息对象
            MimeMessage message=new MimeMessage(sess);
            //设置发件人
            InternetAddress from_mail=new InternetAddress(from);
            message.setFrom(from_mail);
            //设置接收人
            InternetAddress to_mail=new InternetAddress(to);
            message.setRecipient(Message.RecipientType.TO,to_mail);
            //设置主题
            message.setSubject(subject);
            //设置内容
            message.setText(messageText);
            //设置发送时间
            message.setSentDate(new Date());
            //发送邮件
            message.saveChanges();
            Transport transport =sess.getTransport("smtp");
            transport.connect(mailserver,from,password);
            transport.sendMessage(message,message.getAllRecipients());
            transport.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }*/
    }
    protected void sendCode(HttpServletRequest request, HttpServletResponse response,String subject,String sessionIDName,String sessonCodeName) throws ServletException, IOException {
        // TODO Auto-generated method stub
        try {
            HttpSession session = request.getSession();
            request.setCharacterEncoding("UTF-8");
            String from="874280179@qq.com";
            String password="zjgyfvrvufxybbbe";
            String to=request.getParameter("to");
            //随机类
            Random random = new Random();
            //随机产生6位验证码
            String[] codes = {"2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","S","T","U","V","W","X","Y","Z"};
            String code = "";
            for(int i=0;i<6;i++){
                String str = codes[random.nextInt(codes.length)];
                code += str;
            }
            // 将认证码存入SESSION
            session.setAttribute(sessionIDName, to);
            session.setAttribute(sessonCodeName, code);
            //填写右键内容
            String messageText="你的验证码是"+code;
            int n=from.indexOf('@');
            int m=from.length();
            String mailserver="smtp."+from.substring(n+1,m);
            Properties pro=new Properties();
            pro.put("mail.smtp.host",mailserver);
            pro.put("mail.smtp.auth","true");
            Session sess= Session.getInstance(pro);
            sess.setDebug(true);
            //新建消息对象
            MimeMessage message=new MimeMessage(sess);
            //设置发件人
            InternetAddress from_mail=new InternetAddress(from);
            message.setFrom(from_mail);
            //设置接收人
            InternetAddress to_mail=new InternetAddress(to);
            message.setRecipient(Message.RecipientType.TO,to_mail);
            //设置主题
            message.setSubject(subject);
            //设置内容
            message.setText(messageText);
            //设置发送时间
            message.setSentDate(new Date());
            //发送邮件
            message.saveChanges();
            Transport transport =sess.getTransport("smtp");
            transport.connect(mailserver,from,password);
            transport.sendMessage(message,message.getAllRecipients());
            transport.close();
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }
}
