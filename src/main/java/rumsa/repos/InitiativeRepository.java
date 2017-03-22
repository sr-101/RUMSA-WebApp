package rumsa.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import rumsa.model.Initiative;

@Repository
@Transactional
public interface InitiativeRepository extends JpaRepository<Initiative, Long> {
	public Initiative findByName(String name);
	
    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM Initiative c WHERE c.name = :name")
    boolean existsByName(@Param("name") String name);
    
	/*@Modifying(clearAutomatically = true)
    @Query("UPDATE Initiative.members e SET e.bio = :bio,e.email = :email,e.name = :name,e.position = :position,e.img = :img"
    		+ " WHERE e.member_id = :id")
    int update(@Param("id") long id, @Param("bio") String bio, @Param("email") String email, 
    		@Param("name") String name, @Param("position") String position, @Param("img") String img);*/
	
}
