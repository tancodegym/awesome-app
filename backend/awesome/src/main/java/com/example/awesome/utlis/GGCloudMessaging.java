package com.example.awesome.utlis;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import org.jetbrains.annotations.NotNull;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Arrays;
import java.util.Scanner;

public class GGCloudMessaging {
    private static final String PROJECT_ID = "awesome-project-189a4";
    private static final String BASE_URL = "https://fcm.googleapis.com";
    private static final String FCM_SEND_ENDPOINT = "/v1/projects/" + PROJECT_ID + "/messages:send";
    //	https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https://developers.google.com/oauthplayground&prompt=consent&response_type=code&client_id=407408718192.apps.googleusercontent.com&scope=&access_type=offline
    private static final String MESSAGING_SCOPE = "https://www.googleapis.com/auth/firebase.messaging";
    private static final String[] SCOPES = { MESSAGING_SCOPE };

    private static final String TITLE = "FCM Notification";
    private static final String BODY = "Notification from FCM";
    public static final String MESSAGE_KEY = "message";
    private static final String MESSAGE_TITLE = "Test message";
    private static final String MESSAGE_BODY = "This is a test message sent from the Firebase Cloud Messaging API.";
    private static String getAccessToken() throws IOException {
        GoogleCredentials googleCredentials = GoogleCredentials
                .fromStream(new FileInputStream("/Users/tan.tran2/IdeaProjects/awesome/src/main/resources/awesome-project-189a4-firebase-adminsdk-v7ttl-ed05e2e3ca.json"))
                .createScoped(Arrays.asList(SCOPES));
        googleCredentials.refreshIfExpired();
        return googleCredentials.getAccessToken().getTokenValue();

    }

    private static HttpURLConnection getConnection() throws IOException {
        // [START use_access_token]
        URL url = new URL(BASE_URL + FCM_SEND_ENDPOINT);
        HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
        String token = getAccessToken();
        System.out.println(token);
        httpURLConnection.setRequestProperty("Authorization", "Bearer " + token);
        httpURLConnection.setRequestProperty("Content-Type", "application/json; UTF-8");
        return httpURLConnection;
        // [END use_access_token]
    }
    private static void sendMessage(@NotNull JsonObject fcmMessage) throws IOException {
        HttpURLConnection connection = getConnection();
        connection.setDoOutput(true);
        OutputStreamWriter writer = new OutputStreamWriter(connection.getOutputStream(), "UTF-8");
        writer.write(fcmMessage.toString());
        writer.flush();
        writer.close();

        int responseCode = connection.getResponseCode();
        if (responseCode == 200) {
            String response = inputstreamToString(connection.getInputStream());
            System.out.println("Message sent to Firebase for delivery, response:");
            System.out.println(response);
        } else {
            System.out.println("Unable to send message to Firebase:");
            String response = inputstreamToString(connection.getErrorStream());
            System.out.println(response);
        }
    }
    public static void sendOverrideMessage(String token) throws IOException {
        JsonObject overrideMessage = buildOverrideMessage(token);
        System.out.println("FCM request body for override message:");
        prettyPrint(overrideMessage);
        sendMessage(overrideMessage);
    }
    private static JsonObject buildOverrideMessage(String token) {
        JsonObject jNotificationMessage = buildNotificationMessage();

        JsonObject messagePayload = jNotificationMessage.get(MESSAGE_KEY).getAsJsonObject();
//        String token ="dNFJD2KZSOeEeunZ5ltY2f:APA91bEcAsnvvf61hA2N6FVkFmoaI6emmR551U2vkaJ7l_PaXeY-1y1ICH7lh-O85bpq-UZPnhtEAa4tKUyJaWvjr5KEjFUr4eziZCepgForQeq_xtusrQHN77mCFd6-hdGlaZKPg98x";

        messagePayload.addProperty("token", token);
        JsonObject data = new JsonObject();
        messagePayload.add("data", data);
//        JsonObject data = new JsonObject();
//        data.addProperty("Nick", "Mario");
//        data.addProperty("body", "great match!");
//        data.addProperty("Room", "PortugalVSDenmark");
        JsonObject notification =  new JsonObject();
        notification.addProperty("body","This is an FCM notification message!");
        notification.addProperty("title", "NOTIFICATION");
        notification.addProperty("image", "https://w7.pngwing.com/pngs/773/168/png-transparent-pokemon-pikachu-illustration-pokemon-go-pokemon-yellow-pikachu-ash-ketchum-pikachu-mammal-vertebrate-video-game-thumbnail.png");

        messagePayload.add("notification", notification);


		messagePayload.add("android", buildAndroidOverridePayload());

        JsonObject apnsPayload = new JsonObject();
        apnsPayload.add("headers", buildApnsHeadersOverridePayload());
        apnsPayload.add("payload", buildApsOverridePayload());

//		messagePayload.add("apns", apnsPayload);

        jNotificationMessage.add(MESSAGE_KEY, messagePayload);

        return jNotificationMessage;
    }
    private static JsonObject buildAndroidOverridePayload() {
//        Color color = new Color(0,1,0,1);
        JsonObject color = new JsonObject();
        color.addProperty("red", 0);
        color.addProperty("green", 1);
        color.addProperty("blue", 0);
        color.addProperty("alpha", 1);
        JsonObject lighSettings = new JsonObject();
        lighSettings.add("color", color);
        lighSettings.addProperty("light_on_duration", "3.5s");
        lighSettings.addProperty("light_off_duration", "3.5s");
//        LightSettings lightSettings = new LightSettings(color,"3.5s","3.5s");
        JsonObject notification = new JsonObject();
        notification.addProperty("channel_id", "sound_channel_id");
        notification.addProperty("color", "red");
        notification.addProperty("sound", "funny_notification.mp3");
        notification.addProperty("click_action","");
        notification.addProperty("notification_priority", "PRIORITY_MAX");
        notification.addProperty("default_sound", true);
        notification.addProperty("default_light_settings", true);
        notification.addProperty("visibility", "PRIVATE");
        notification.addProperty("notification_count", 9);
        notification.add("light_settings", lighSettings);

//        Notification notification = new Notification("sound_channel_id","green","funny_notification.mp3",
//                "","PRIORITY_MAX",true,true,"PRIVATE",9,lightSettings);
//        AndroidDTO androidDTO = new AndroidDTO(true,"group_messages_to_show_last_message_only",notification);
        JsonObject androidNotification = new JsonObject();
        androidNotification.addProperty("direct_boot_ok", true);
        androidNotification.addProperty("collapse_key","group_messages_to_show_last_message_only");
        androidNotification.add("notification", notification);
//        androidNotification.addProperty("Nick", "Mario");
//        androidNotification.addProperty("body", "great match!");
//        androidNotification.addProperty("Room", "PortugalVSDenmark");
//
//        JsonObject androidNotificationPayload = new JsonObject();
//
//        androidNotificationPayload.add("data", androidNotification);
        return androidNotification;
    }
    private static JsonObject buildApnsHeadersOverridePayload() {
        JsonObject apnsHeaders = new JsonObject();
        apnsHeaders.addProperty("apns-priority", "10");

        return apnsHeaders;
    }
    private static JsonObject buildApsOverridePayload() {
        JsonObject badgePayload = new JsonObject();
        badgePayload.addProperty("badge", 1);

        JsonObject apsPayload = new JsonObject();
        apsPayload.add("aps", badgePayload);
        System.out.println(apsPayload);
        return apsPayload;
    }
    public static void sendCommonMessage() throws IOException {
        JsonObject notificationMessage = buildNotificationMessage();
        System.out.println("FCM request body for message using common notification object:");
        prettyPrint(notificationMessage);
        sendMessage(notificationMessage);
    }
    private static JsonObject buildNotificationMessage() {
        JsonObject jNotification = new JsonObject();
        jNotification.addProperty("title", TITLE);
        jNotification.addProperty("body", BODY);

        JsonObject jMessage = new JsonObject();
//		jMessage.add("notification", jNotification);
//		jMessage.addProperty("topic", "news");

        JsonObject jFcm = new JsonObject();
        jFcm.add(MESSAGE_KEY, jMessage);
        return jFcm;
    }
    private static String inputstreamToString(InputStream inputStream) throws IOException {
        StringBuilder stringBuilder = new StringBuilder();
        Scanner scanner = new Scanner(inputStream);
        while (scanner.hasNext()) {
            stringBuilder.append(scanner.nextLine());
        }
        return stringBuilder.toString();
    }
    private static void prettyPrint(JsonObject jsonObject) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        System.out.println(gson.toJson(jsonObject) + "\n");
    }
}
