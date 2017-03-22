package rumsa.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

@Entity
@Table(name="initiative")
public class Initiative {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column
	private long id;
	
	@Column
	private String name;
	
	@Column
	private String description;
	
	@Column
	private String extra;
	
	@OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name="initiative")
	private List<InitiativeMember> members;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getExtra() {
		return extra;
	}

	public void setExtra(String extra) {
		this.extra = extra;
	}

	public List<InitiativeMember> getMembers() {
		return members;
	}

	public void setMembers(List<InitiativeMember> members) {
		this.members = members;
	}

	@Override
	public String toString() {
		return "Initiative [id=" + id + ", members=" + members + "]";
	}
	
}
