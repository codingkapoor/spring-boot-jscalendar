package com.codingkapoor.jscalendar.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Year {

	@Id
	private int year;

	@OneToMany(mappedBy = "year", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<Holiday> holidays;

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public Set<Holiday> getHolidays() {
		return holidays;
	}

	public void setHolidays(Set<Holiday> holidays) {
		this.holidays = holidays;
	}

}
