package rumsa.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="initiative_member")
public class InitiativeMember{
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column
	private long id;
	
	@Column
	private long initiative;
	
	@Column
    private String position;

	@Column
    private String name;
    
	@Column
    private String img;
	
	@Column
    private String email;
	
	@Column
    private String bio;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getInitiative() {
		return initiative;
	}

	public void setInitiative(long initiative) {
		this.initiative = initiative;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	@Override
	public String toString() {
		return "InitiativeMember [position=" + position + ", name=" + name + ", img=" + img + ", email=" + email
				+ ", bio=" + bio + "]";
	}
}