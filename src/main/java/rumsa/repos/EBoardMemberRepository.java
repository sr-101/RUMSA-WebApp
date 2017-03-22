package rumsa.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import rumsa.model.EBoardMember;

@Repository
@Transactional
public interface EBoardMemberRepository extends JpaRepository<EBoardMember, Long> {
	public EBoardMember findByName(String name);
	
    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM EBoardMember c WHERE c.name = :name")
    boolean existsByName(@Param("name") String name);
	
    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM EBoardMember c WHERE c.position= :position")
    boolean existsByPos(@Param("position") String position);
    
	@Modifying(clearAutomatically = true)
    @Query("UPDATE EBoardMember e SET e.bio = :bio,e.email = :email,e.name = :name,e.position = :position,e.img = :img"
    		+ " WHERE e.id = :id")
    int update(@Param("id") long id, @Param("bio") String bio, @Param("email") String email, 
    		@Param("name") String name, @Param("position") String position, @Param("img") String img);
	
	@Modifying(clearAutomatically = true)
    @Query("UPDATE EBoardMember e SET e.id = :id, e.bio = :bio,e.email = :email,e.name = :name,e.position = :position,e.img = :img"
    		+ " WHERE e.position = :position")
    int updatebyPos(@Param("id") long id, @Param("bio") String bio, @Param("email") String email, 
    		@Param("name") String name, @Param("position") String position, @Param("img") String img);
}
