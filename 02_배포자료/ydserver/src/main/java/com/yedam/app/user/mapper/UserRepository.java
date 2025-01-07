package com.yedam.app.user.mapper;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.yedam.app.user.service.UserVO;


@Repository
public interface UserRepository extends JpaRepository<UserVO, Integer> {

	// 아이디로 단건조회
	public UserVO findById(String id);
	
	// 아이디로 삭제
	@Transactional
	public void deleteById(String id);
}
