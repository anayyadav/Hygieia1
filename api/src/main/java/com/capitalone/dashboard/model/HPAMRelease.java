package com.capitalone.dashboard.model;

public class HPAMRelease {

	private String workspaceid;
	private Object status;
	private String appID;
	private String appName;
	private String releasename;
	private String enddate;
	private String workspacename;
	private String startdate;
	private String releaseid;
	private int remainingSP;
	private String today;
	
	public String getAppName() {
		return appName;
	}
	public void setAppName(String appName) {
		this.appName = appName;
	}
	public String getAppID() {
		return appID;
	}
	public void setAppID(String appID) {
		this.appID = appID;
	}
	public int getRemainingSP() {
		return remainingSP;
	}
	public void setRemainingSP(int remainingSP) {
		this.remainingSP = remainingSP;
	}
	public String getToday() {
		return today;
	}
	public void setToday(String today) {
		this.today = today;
	}
	public String getWorkspaceid() {
		return workspaceid;
	}
	public void setWorkspaceid(String workspaceid) {
		this.workspaceid = workspaceid;
	}
	public Object getStatus() {
		return status;
	}
	public void setStatus(Object status) {
		this.status = status;
	}
	public String getReleasename() {
		return releasename;
	}
	public void setReleasename(String releasename) {
		this.releasename = releasename;
	}
	public String getenddate() {
		return enddate;
	}
	public void setenddate(String enddate) {
		this.enddate = enddate;
	}
	public String getWorkspacename() {
		return workspacename;
	}
	public void setWorkspacename(String workspacename) {
		this.workspacename = workspacename;
	}
	public String getstartdate() {
		return startdate;
	}
	public void setstartdate(String startdate) {
		this.startdate = startdate;
	}
	public String getReleaseid() {
		return releaseid;
	}
	public void setReleaseid(String releaseid) {
		this.releaseid = releaseid;
	}
	
}
