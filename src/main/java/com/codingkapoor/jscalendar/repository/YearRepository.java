package com.codingkapoor.jscalendar.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.codingkapoor.jscalendar.entity.Year;

@RepositoryRestResource
public interface YearRepository extends PagingAndSortingRepository<Year, Integer> {

}
