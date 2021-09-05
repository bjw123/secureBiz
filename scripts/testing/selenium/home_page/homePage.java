package testpackage;

import java.util.concurrent.TimeUnit;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.sikuli.script.FindFailed;
import org.sikuli.script.Pattern;
import org.sikuli.script.Screen;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

//This class tests if all buttons on the homepage work and are displayed correctly.
public class homePage {
    //URL may need to be updated based on web application version.
    public String baseUrl = "https://test.securebizapp.com/#/";
    //Update path according to location of driver in local environment.
    String driverPath = "C://selenium jars and drivers//drivers//chrome/chromedriver.exe";
    public WebDriver driver;

    @Test
    public void testAssessButton() throws InterruptedException {
        driver.findElement(By.linkText("ASSESS")).click();
        Thread.sleep(3000);
        //Test if all buttons in dropdown menu are displayed correctly, including spelling.
        driver.findElement(By.linkText("APPLICATION CONTROL")).getText();
        driver.findElement(By.linkText("CONFIGURE MICROSOFT OFFICE MACRO SETTINGS")).getText();
        driver.findElement(By.linkText("PATCH APPLICATIONS")).getText();
        driver.findElement(By.linkText("USER APPLICATION HARDENING")).getText();
        driver.findElement(By.linkText("RESTRICT ADMINISTRATIVE PRIVILEGES")).getText();
        driver.findElement(By.linkText("MULTI-FACTOR AUTHENTICATION")).getText();
        driver.findElement(By.linkText("PATCH OPERATING SYSTEMS")).getText();
        driver.findElement(By.linkText("DAILY BACKUPS")).getText();
        System.out.println("Test for ASSESS button completed.");
    }

    @Test
    public void testFeedbackButton() throws InterruptedException {
        Thread.sleep(5000);
        driver.findElement(By.linkText("FEEDBACK")).click();
        Thread.sleep(3000);
        //Test if Submit button is displayed correctly, including spelling.
        driver.findElement(By.xpath("//button[contains(text(),'Submit')]")).getText();
        driver.findElement(By.xpath("//span[contains(text(),'×')]")).click();
        System.out.println("Test for FEEDBACK button completed.");
    }

    @Test
    public void testAdminButton() throws InterruptedException {
        Thread.sleep(5000);
        driver.findElement(By.linkText("ADMIN PORTAL")).click();
        Thread.sleep(3000);
        //Test if Login and Cancel buttons are displayed correctly, including spelling.
        driver.findElement(By.xpath("//button[contains(text(),'Login')]")).getText();
        driver.findElement(By.xpath("//button[contains(text(),'Cancel')]")).getText();
        driver.findElement(By.xpath("//span[contains(text(),'×')]")).click();
        System.out.println("Test for ADMIN PORTAL button completed.");
    }

    @Test
    public void testGetStartedButton() throws InterruptedException, FindFailed {
        Thread.sleep(5000);
        Screen screen = new Screen();
        driver.findElement(By.xpath("//button[contains(text(),'GET STARTED')]")).click();
        Thread.sleep(3000);
        //Update path according to location of images in local environment. This includes lines 63, 67 and 71.
        Pattern none = new Pattern("C:\\Users\\Ben\\Desktop\\images\\none.png");
        screen.click(none);
        Thread.sleep(3000);
        screen.click(none);
        Pattern yes = new Pattern("C:\\Users\\Ben\\Desktop\\images\\yes.png");
        Thread.sleep(3000);
        screen.click(yes);
        Thread.sleep(3000);
        //Test if Office Macro text is displayed in the modal.
        Pattern officeMacro = new Pattern("C:\\Users\\Ben\\Desktop\\images\\office_macro.png");
        screen.find(officeMacro);
        System.out.println("Test for GET STARTED button completed.");
    }

    @BeforeTest
    public void beforeTest() throws InterruptedException {
        System.setProperty("webdriver.chrome.driver", driverPath);
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
        driver.manage().window().maximize();
        driver.get(baseUrl);
        Thread.sleep(5000);
        String title = driver.getTitle();
        System.out.println(title);
        Assert.assertEquals(title, "Secure Biz - React Prototype");
        System.out.println("Before test completed.");
    }

    @AfterTest
    public void afterTest(){
        driver.quit();
        System.out.println("After test completed.");
    }
}