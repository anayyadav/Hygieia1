package com.capitalone.dashboard.model;

public class HPAMSpikedata {
			
		
		private String releaseid;
		private String workspaceid;
		private String appname;
		private String appID;
		private int spikeCount;
		private int spikePoints;
		
		public int getSpikePoints() {
			return spikePoints;
		}
		public void setSpikePoints(int spikePoints) {
			this.spikePoints = spikePoints;
		}
		public String getReleaseid() {
			return releaseid;
		}
		public void setReleaseid(String releaseid) {
			this.releaseid = releaseid;
		}
		public String getWorkspaceid() {
			return workspaceid;
		}
		public void setWorkspaceid(String workspaceid) {
			this.workspaceid = workspaceid;
		}
		public String getAppname() {
			return appname;
		}
		public void setAppname(String appname) {
			this.appname = appname;
		}
		public String getAppID() {
			return appID;
		}
		public void setAppID(String appID) {
			this.appID = appID;
		}
		public int getSpikeCount() {
			return spikeCount;
		}
		public void setSpikeCount(int spikeCount) {
			this.spikeCount = spikeCount;
		}
		
}
