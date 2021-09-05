//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.sikuli.script.FindFailed;
import org.sikuli.script.Pattern;
import org.sikuli.script.Screen;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import java.util.concurrent.TimeUnit;

public class AdminPortal {
    public String baseUrl = "http://localhost:8081";
    String driverPath = "I://SIT764//Selennium jars and drivers//drivers//chrome/chromedriver.exe";
    public WebDriver driver;
    boolean feedbackCheck = false;
    boolean externalCheck = false;

    public AdminPortal() {
    }

    @Test(
            priority = 1
    )
    public void logInFromHomePage() throws InterruptedException {
        Thread.sleep(6000L);
        this.driver.findElement(By.linkText("ADMIN PORTAL")).click();
        Thread.sleep(2500L);
        WebElement userName = this.driver.findElement(By.name("userName"));
        WebElement password = this.driver.findElement(By.name("password"));
        userName.sendKeys(new CharSequence[]{"admin@gmail.com"});
        Thread.sleep(1000L);
        password.sendKeys(new CharSequence[]{"123456"});
        Thread.sleep(1000L);
        this.driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();
        Thread.sleep(3000L);
        System.out.println("Test for LOG IN FROM HOME PAGE completed.");
    }

    @Test(
            priority = 2
    )
    public void profileScreen() throws InterruptedException, FindFailed {
        this.driver.findElement(By.linkText("Jessica Jones")).click();
        Thread.sleep(1500L);
        this.driver.findElement(By.linkText("My profile")).click();
        Thread.sleep(3000L);
        this.feedback_test();
        this.external_Test();
        Thread.sleep(1500L);
        this.driver.findElement(By.linkText("Jessica Jones")).click();
        Thread.sleep(1500L);
        this.driver.findElement(By.linkText("Settings")).click();
        Thread.sleep(1500L);
        this.driver.findElement(By.linkText("Jessica Jones")).click();
        Thread.sleep(1500L);
        this.driver.findElement(By.linkText("Logout")).click();
        System.out.println("Test for PROFILE SCREEN & FEEDBACK & EXTERNAL completed.");
    }

    public void feedback_test() throws InterruptedException, FindFailed {
        Screen screen = new Screen();
        this.driver.findElement(By.linkText("Feedback")).click();
        Thread.sleep(1500L);
        this.driver.findElement(By.linkText("1")).click();
        Thread.sleep(1500L);
        Pattern feedback_2 = new Pattern("I:\\SIT764\\selenium\\images\\2_feedback.png");
        screen.click(feedback_2);
        Thread.sleep(3000L);
        Pattern feedback_3 = new Pattern("I:\\SIT764\\selenium\\images\\3_feedback.png");
        screen.click(feedback_3);
        Thread.sleep(3000L);
        Pattern feedbackNext = new Pattern("I:\\SIT764\\selenium\\images\\Next_feedback.png");
        screen.click(feedbackNext);
        this.feedbackCheck = true;
    }

    @Test(
            priority = 3
    )
    public void feedbackDone() {
        if (this.feedbackCheck) {
            System.out.println("Test for FEEDBACK completed.");
        } else {
            Assert.fail("feedbackCheck did not equal true");
        }

    }

    public void external_Test() throws InterruptedException {
        String linkNewTab = Keys.chord(new CharSequence[]{Keys.CONTROL, Keys.ENTER});
        this.driver.findElement(By.linkText("Creative Tim")).sendKeys(new CharSequence[]{linkNewTab});
        this.driver.findElement(By.linkText("About Us")).sendKeys(new CharSequence[]{linkNewTab});
        this.driver.findElement(By.linkText("Blog")).sendKeys(new CharSequence[]{linkNewTab});
        this.driver.findElement(By.linkText("SECURE BIZ")).sendKeys(new CharSequence[]{linkNewTab});
        this.externalCheck = true;
    }

    @Test(
            priority = 4
    )
    public void externalLinks() {
        if (this.externalCheck) {
            System.out.println("Test for EXTERNAL completed.");
        } else {
            Assert.fail("externalCheck did not equal true");
        }

    }

    @BeforeTest
    public void beforeTest() {
        System.setProperty("webdriver.chrome.driver", this.driverPath);
        this.driver = new ChromeDriver();
        this.driver.manage().timeouts().implicitlyWait(20L, TimeUnit.SECONDS);
        this.driver.manage().window().maximize();
        this.driver.get(this.baseUrl);
        String title = this.driver.getTitle();
        System.out.println(title);
        Assert.assertEquals(title, "Secure Biz - React Prototype");
        System.out.println("Before test completed.");
    }

    @AfterTest
    public void afterTest() {
        this.driver.quit();
        System.out.println("After test completed.");
    }
}
