package com.yedam.app.user.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.yedam.app.user.mapper.UserRepository;
import com.yedam.app.user.service.UserVO;

import lombok.RequiredArgsConstructor;
@CrossOrigin
@RestController
@RequiredArgsConstructor
public class UserController {
	private final UserRepository userRepository;
	
	//전체조회
	@GetMapping("/userList")
	public List<UserVO> getUserAllList(){
		return userRepository.findAll();
	}
	
	//단건조회
	@GetMapping("/userInfo")
	public UserVO getUserInfo(UserVO userVO){
		return userRepository.findById(userVO.getId());
	}
	
	//등록
	@PostMapping("/userInsert")
	public UserVO InsertUserInfo(UserVO userVO){
		System.out.println(userVO);
		return userRepository.save(userVO);
	}
	
	//수정
	@PostMapping("/userUpdate")
	public UserVO UpdateUserInfo(@RequestBody UserVO userVO){
		return userRepository.save(userVO);
	}	
	
	//삭제
	@GetMapping("/userDelete")
	public Map<String, Object> UpdateUserInfo(String id){
		Map<String, Object> map = new HashMap<>();
		userRepository.deleteById(id);
		map.put("user_id", id);
		return map;
	}	
}
