package com.capitalone.dashboard.model;

public class HPAMDefectRejection {
	
	private String appid;
	private String workspaceid;
	private String workspacename;
	private String appname;
	private int rejected;
	private int total;
	public String getAppid() {
		return appid;
	}
	public void setAppid(String appid) {
		this.appid = appid;
	}
	public String getWorkspaceid() {
		return workspaceid;
	}
	public void setWorkspaceid(String workspaceid) {
		this.workspaceid = workspaceid;
	}
	public String getWorkspacename() {
		return workspacename;
	}
	public void setWorkspacename(String workspacename) {
		this.workspacename = workspacename;
	}
	public String getAppname() {
		return appname;
	}
	public void setAppname(String appname) {
		this.appname = appname;
	}
	public int getRejected() {
		return rejected;
	}
	public void setRejected(int rejected) {
		this.rejected = rejected;
	}
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
	
	

}

