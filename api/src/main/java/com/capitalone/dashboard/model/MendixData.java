package com.capitalone.dashboard.model;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "mendixdata")
public class MendixData extends BaseModel {

	MendixData() {

	}
	private List<BuildApiDetail> buildApiDetails = new ArrayList<>();
	private List<TeamserverApiRevisionDetail> commits = new ArrayList<>(); 
	private List<DeployApiDetail> deploy = new ArrayList<>();
	
	public List<DeployApiDetail> getDeployApiDetail() {
		return deploy;
	}
	public void setDeployApiDetail(List<DeployApiDetail> deploy) {
		this.deploy = deploy;
	}

	public List<BuildApiDetail> getBuildApiDetails() {
		return buildApiDetails;
	}
	public void setBuildApiDetails(List<BuildApiDetail> buildApiDetails) {
		this.buildApiDetails = buildApiDetails;
	}
	
	public List<TeamserverApiRevisionDetail> getTeamserverApiRevisionDetail() {
		return commits;
	}
	public void setTeamserverApiRevisionDetail(List<TeamserverApiRevisionDetail> commits) {
		this.commits = commits;
	}

	public MendixData(List<BuildApiDetail> buildApiDetails, List<TeamserverApiRevisionDetail> commits ,List<DeployApiDetail> deploy ) {
		super();
		this.buildApiDetails = buildApiDetails;
		this.commits =commits;
		this.deploy = deploy;
	}
	@Override
	public String toString() {
		return "MendixData [buildApiDetails=" + buildApiDetails +", commits="
				+ commits + ", deploy="
				+ deploy + "]";
	}
	
	
}
