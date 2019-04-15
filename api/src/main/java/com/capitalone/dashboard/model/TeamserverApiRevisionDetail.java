package com.capitalone.dashboard.model;


public class TeamserverApiRevisionDetail {
	

	private String branchname ;
	private String scmCommitLog;
	private String scmAuthor ;
	private String appname;
	private Long scmCommitTimestamp;
	private String timestamp;
	private int scmRevisionNumber ;
	private boolean firstEverCommit;
	public String getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}
	public String getBranchname() {
		return branchname;
	}
	public void setBranchname(String branchname) {
		this.branchname = branchname;
	}
	public String getScmCommitLog() {
		return scmCommitLog;
	}
	public void setScmCommitLog(String scmCommitLog) {
		this.scmCommitLog = scmCommitLog;
	}
	public String getScmAuthor() {
		return scmAuthor;
	}
	public void setScmAuthor(String scmAuthor) {
		this.scmAuthor = scmAuthor;
	}
	public String getAppname() {
		return appname;
	}
	public void setAppname(String appname) {
		this.appname = appname;
	}
	public Long getScmCommitTimestamp() {
		return scmCommitTimestamp;
	}
	public void setScmCommitTimestamp(Long scmCommitTimestamp) {
		this.scmCommitTimestamp = scmCommitTimestamp;
	}
	
	public int getScmRevisionNumber() {
		return scmRevisionNumber;
	}
	public void setScmRevisionNumber(int scmRevisionNumber) {
		this.scmRevisionNumber = scmRevisionNumber;
	}
	public boolean isFirstEverCommit() {
		return firstEverCommit;
	}
	public void setFirstEverCommit(boolean firstEverCommit) {
		this.firstEverCommit = firstEverCommit;
	}
	
	

}
