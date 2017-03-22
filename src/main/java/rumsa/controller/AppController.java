package rumsa.controller;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;
import java.security.PrivateKey;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.GenericUrl;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpResponse;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.Drive.Files;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;

import rumsa.model.EBoardMember;
import rumsa.model.Initiative;
import rumsa.repos.EBoardMemberRepository;
import rumsa.repos.InitiativeRepository;

@RestController
public class AppController {
	
	@Autowired
	EBoardMemberRepository eboard;
	
	@Autowired
	InitiativeRepository initiatives;
	
	ObjectMapper mapper = new ObjectMapper();
	
	@RequestMapping(value="/eboard")
	public List<EBoardMember> getallmembers(){
		return eboard.findAll();
	}
	
	@RequestMapping(value="/eboard", method=RequestMethod.POST)
	public void addeboardmem(@RequestBody String json) throws JsonParseException, JsonMappingException, IOException{
		EBoardMember obj = mapper.readValue(json, EBoardMember.class);
		if(eboard.count()>1 && eboard.exists(obj.getId()) && eboard.existsByName(obj.getName()) && eboard.existsByPos(obj.getPosition())){
			eboard.update(obj.getId(), obj.getBio(), obj.getEmail(), obj.getName(), obj.getPosition(), obj.getImg());
		}
		else if(eboard.existsByPos(obj.getPosition())){
			eboard.updatebyPos(obj.getId(), obj.getBio(), obj.getEmail(), obj.getName(), obj.getPosition(), obj.getImg());
		}
		else{
			eboard.save(obj);
		}
	}
	
	@RequestMapping(value="/eboard/{name}", method=RequestMethod.GET)
	public EBoardMember geteboardmem(@PathVariable String name){
		return eboard.findByName(name);
	}
	
	@RequestMapping(value="/eboard/deletename/{name}", method=RequestMethod.GET)
	public void deletebyName(@PathVariable String name){
		EBoardMember obj=eboard.findByName(name);
		eboard.delete(obj);
	}
	
	@RequestMapping(value="/eboard/deleteid/{id}", method=RequestMethod.GET)
	public void deletebyID(@PathVariable long id){
		EBoardMember obj=eboard.findOne(id);
		eboard.delete(obj);
	}
	
	@RequestMapping(value="/initiatives")
	public List<Initiative> getallinitiatives(){
		List<Initiative> inits=initiatives.findAll();
		inits.sort((a, b) -> a.getName().compareToIgnoreCase(b.getName()));
		return inits; 
	}
	
	@RequestMapping(value="/initiatives", method=RequestMethod.POST)
	public void addinit(@RequestBody String json) throws JsonParseException, JsonMappingException, IOException{
		Initiative obj = mapper.readValue(json, Initiative.class);
		if(initiatives.count()>1 && initiatives.exists(obj.getId()) && initiatives.existsByName(obj.getName())){
			//eboard.update(obj.getId(), obj.getBio(), obj.getEmail(), obj.getName(), obj.getPosition(), obj.getImg());
		}
		else{
			initiatives.save(obj);
		}
	}
	
    /** Application name. */
    private static final String APPLICATION_NAME =
        "Drive API Java Quickstart";

    /** Directory to store user credentials for this application. */
    private static final java.io.File DATA_STORE_DIR = new java.io.File(
        System.getProperty("user.home"), "Desktop/.credentials/drive-java-quickstart");

    /** Global instance of the {@link FileDataStoreFactory}. */
    private static FileDataStoreFactory DATA_STORE_FACTORY;

    /** Global instance of the JSON factory. */
    private static final JsonFactory JSON_FACTORY =
        JacksonFactory.getDefaultInstance();

    /** Global instance of the HTTP transport. */
    private static HttpTransport HTTP_TRANSPORT;

    /** Global instance of the scopes required by this quickstart.
     *
     * If modifying these scopes, delete your previously saved credentials
     * at ~/.credentials/drive-java-quickstart
     */
    private static final List<String> SCOPES =
        Arrays.asList(DriveScopes.DRIVE,DriveScopes.DRIVE_FILE);

	private static final String SERVICE_ACCOUNT_EMAIL = "rumsa-582@dazzling-seat-159608.iam.gserviceaccount.com";

    static {
        try {
            HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
            DATA_STORE_FACTORY = new FileDataStoreFactory(DATA_STORE_DIR);
        } catch (Throwable t) {
            t.printStackTrace();
            System.exit(1);
        }
    }

    /**
     * Creates an authorized Credential object.
     * @return an authorized Credential object.
     * @throws IOException
     */
    public static Credential authorize() throws IOException {
        // Load client secrets.
        InputStream credentialsJSON =
            AppController.class.getResourceAsStream("/client_secret.json");
        
        GoogleCredential gcFromJson = GoogleCredential.fromStream(credentialsJSON, HTTP_TRANSPORT, JSON_FACTORY).createScoped(SCOPES);

        return new GoogleCredential.Builder()
                .setTransport(gcFromJson.getTransport())
                .setJsonFactory(gcFromJson.getJsonFactory())
                .setServiceAccountId(gcFromJson.getServiceAccountId())
                .setServiceAccountUser(SERVICE_ACCOUNT_EMAIL)
                .setServiceAccountPrivateKey(gcFromJson.getServiceAccountPrivateKey())
                .setServiceAccountScopes(gcFromJson.getServiceAccountScopes())
                .build();
    }

	
	public static Drive getDriveService() throws IOException, GeneralSecurityException {
        Credential credential = authorize();
        return new Drive.Builder(
                HTTP_TRANSPORT, JSON_FACTORY, credential)
                .build();
    }

	
    /**
     * Retrieve a list of File resources.
     *
     * @param service Drive API service instance.
     * @return List of File resources.
     * @throws GeneralSecurityException 
     */
	@RequestMapping(value="/files", method=RequestMethod.GET)
    private static List<File> retrieveAllFiles() throws IOException, GeneralSecurityException {
    	Drive service=getDriveService();
    	List<File> result = new ArrayList<File>();
    	Files.List request = service.files().list().setQ("'0B633cUsD-eH8cGJ4VTZDdHJ4SnM' in parents").setFields("files(id,webViewLink,mimeType,name,description)");
      do {
        try {
        	FileList files = request.execute();
        	result=files.getFiles();
        	request.setPageToken(files.getNextPageToken());
        } catch (IOException e) {
          System.out.println("An error occurred: " + e);
          request.setPageToken(null);
        }
      } while (request.getPageToken() != null &&
               request.getPageToken().length() > 0);

      return result;
    }
    
	/**
     * Retrieve a list of File resources.
     *
     * @param service Drive API service instance.
     * @return List of File resources.
     * @throws GeneralSecurityException 
     */
	@RequestMapping(value="/files/{folderid}", method=RequestMethod.GET)
    private static List<File> retrieveFiles(@PathVariable String folderid) throws IOException, GeneralSecurityException {
    	Drive service=getDriveService();
    	List<File> result = new ArrayList<File>();
    	String q="'"+folderid+"' in parents";
    	Files.List request = service.files().list().setQ(q).setFields("files(webViewLink,mimeType,name,description,id)");
      do {
        try {
        	FileList files = request.execute();
        	result=files.getFiles();
        	request.setPageToken(files.getNextPageToken());
        } catch (IOException e) {
          System.out.println("An error occurred: " + e);
          request.setPageToken(null);
        }
      } while (request.getPageToken() != null &&
               request.getPageToken().length() > 0);

      return result;
    }
}