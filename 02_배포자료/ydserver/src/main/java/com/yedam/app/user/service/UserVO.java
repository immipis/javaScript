package com.yedam.app.user.service;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
@Entity
@Table(name = "USERS")
public class UserVO {
	// 각 컬럼에 null 때문에 참조타입인 wrap 객체로 진행
	@Id
	@GeneratedValue(generator = "USER_SEQ")
	private Integer no; // 번호, PIRMARY KEY
	@Column(unique=true)
	private String id;  // 아이디
	private String password; // 비밀번호
	private String gender; // 성별
	private String name; // 이름
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date joinDate; // 가입날짜

}
