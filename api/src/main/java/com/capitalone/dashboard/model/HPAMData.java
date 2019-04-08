package com.capitalone.dashboard.model;
import java.util.ArrayList; import java.util.List;
import org.springframework.data.mongodb.core.mapping.Document; @Document(collection = "hpamdata") 
public class HPAMData extends BaseModel {
	HPAMData() {
	}
	
	private List<HPAMRelease> hpamRelease = new ArrayList<>();
	private List<HPAMSprint> hpamSprint = new ArrayList<>();
	private List<HPPAMDefectConc> hpamDefectConcentration = new ArrayList<>();
	private List<HPAMDefectRejection> hpamDefectRejection = new ArrayList<>();
	private List<HPAMDefectAgeing> hpamDefectAgeing = new ArrayList<>();
	private List<HPAMCurrentSprint> hpamCurrentSprint = new ArrayList<>();
	private List<HPAMFirstnext> hpamFirstnext = new ArrayList<>();
	private List<HPAMSecondnext> hpamSecondnext = new ArrayList<>();
	private List<HPAMThirdnext> hpamThirdnext = new ArrayList<>();
	private List<HPAMSpikedata> hpamSpikedata = new ArrayList<>();
	private List<HPAMDefectdata> hpamDefectdata = new ArrayList<>();
	private List<HPAMCurrentSprintDefect> hpamCurrentSprintDefect = new ArrayList<>();
	
	public List<HPAMCurrentSprintDefect> getHpamCurrentSprintDefect() {
		return hpamCurrentSprintDefect;
	}
	public void setHpamCurrentSprintDefect(List<HPAMCurrentSprintDefect> hpamCurrentSprintDefect) {
		this.hpamCurrentSprintDefect = hpamCurrentSprintDefect;
	}
	public List<HPAMDefectdata> getHpamDefectdata() {
		return hpamDefectdata;
	}
	public void setHpamDefectdata(List<HPAMDefectdata> hpamDefectdata) {
		this.hpamDefectdata = hpamDefectdata;
	}
	public List<HPAMFirstnext> getHpamFirstnext() {
		return hpamFirstnext;
	}
	public void setHpamFirstnext(List<HPAMFirstnext> hpamFirstnext) {
		this.hpamFirstnext = hpamFirstnext;
	}
	public List<HPAMSecondnext> getHpamSecondnext() {
		return hpamSecondnext;
	}
	public void setHpamSecondnext(List<HPAMSecondnext> hpamSecondnext) {
		this.hpamSecondnext = hpamSecondnext;
	}
	public List<HPAMThirdnext> getHpamThirdnext() {
		return hpamThirdnext;
	}
	public void setHpamThirdnext(List<HPAMThirdnext> hpamThirdnext) {
		this.hpamThirdnext = hpamThirdnext;
	}
	public List<HPAMSpikedata> getHpamSpikedata() {
		return hpamSpikedata;
	}
	public void setHpamSpikedata(List<HPAMSpikedata> hpamSpikedata) {
		this.hpamSpikedata = hpamSpikedata;
	}
	public List<HPPAMDefectConc> getHpamDefectConcentration() {
		return hpamDefectConcentration;
	}
	public void setHpamDefectConcentration(List<HPPAMDefectConc> hpamDefectConcentration) {
		this.hpamDefectConcentration = hpamDefectConcentration;
	}
	public List<HPAMDefectRejection> getHpamDefectRejection() {
		return hpamDefectRejection;
	}
	public void setHpamDefectRejection(List<HPAMDefectRejection> hpamDefectRejection) {
		this.hpamDefectRejection = hpamDefectRejection;
	}
	public List<HPAMDefectAgeing> getHpamDefectAgeing() {
		return hpamDefectAgeing;
	}
	public void setHpamDefectAgeing(List<HPAMDefectAgeing> hpamDefectAgeing) {
		this.hpamDefectAgeing = hpamDefectAgeing;
	}
	public List<HPAMCurrentSprint> getHpamCurrentSprint() {
		return hpamCurrentSprint;
	}
	public void setHpamCurrentSprint(List<HPAMCurrentSprint> hpamCurrentSprint) {
		this.hpamCurrentSprint = hpamCurrentSprint;
	}

	public List<HPAMRelease> getHpamRelease() {
		return hpamRelease;
	}
	public void setHpamRelease(List<HPAMRelease> hpamRelease) {
		this.hpamRelease = hpamRelease;
	}
	public List<HPAMSprint> getHpamSprint() {
		return hpamSprint;
	}
	public void setHpamSprint(List<HPAMSprint> hpamSprint) {
		this.hpamSprint = hpamSprint;
	}
	public HPAMData( List<HPAMRelease> hpamRelease, List<HPAMSprint> hpamSprint,
			List<HPPAMDefectConc> hpamDefectConcentration, List<HPAMDefectRejection> hpamDefectRejection,
			List<HPAMDefectAgeing> hpamDefectAgeing, List<HPAMCurrentSprint> hpamCurrentSprint,List<HPAMFirstnext> hpamFirstnext,List<HPAMCurrentSprintDefect> hpamCurrentSprintDefect, List<HPAMSecondnext> hpamSecondnext, List<HPAMThirdnext> hpamThirdnext, List<HPAMSpikedata> hpamSpikedata, List<HPAMDefectdata> hpamDefectdata) {
		super();
		this.hpamRelease = hpamRelease;
		this.hpamSprint = hpamSprint;
		this.hpamDefectConcentration = hpamDefectConcentration;
		this.hpamDefectRejection = hpamDefectRejection;
		this.hpamDefectAgeing = hpamDefectAgeing;
		this.hpamCurrentSprint = hpamCurrentSprint;
		this.hpamDefectdata = hpamDefectdata;
		this.hpamCurrentSprintDefect =hpamCurrentSprintDefect;
	}
	@Override
	public String toString() {
		return "hpamRelease=" + hpamRelease + "hpamSprint=" + hpamSprint
				+ "hpamDefectConcentration=" + hpamDefectConcentration + "hpamDefectRejection=" + hpamDefectRejection
				+ "hpamDefectAgeing =" + hpamDefectAgeing+"hpamCurrentSprint="+hpamCurrentSprint+"hpamFirstnext="+hpamFirstnext+"hpamSecondnext="+hpamSecondnext+"hpamThirdnext="+hpamThirdnext+"hpamSpikedata="+hpamSpikedata+"hpamDefectdata="+hpamDefectdata+"hpamCurrentSprintDefect="+hpamCurrentSprintDefect;
	}
}
