# MySQL_NodeJS

SELECT e.emp_no,e.birth_date, e.first_name,
e.last_name,e.gender, e.hire_date, d.dept_no FROM employees e INNER JOIN dept_emp d ON e.emp_no = d.emp_no;




SELECT t.emp_no,t.birth_date, t.first_name,
t.last_name,t.gender, t.hire_date, t.dept_no,titles.title FROM titles INNER JOIN (SELECT e.emp_no,e.birth_date, e.first_name,
e.last_name,e.gender, e.hire_date, d.dept_no FROM employees e INNER JOIN dept_emp d ON e.emp_no = d.emp_no ) t ON titles.emp_no = t.emp_no;






SELECT COUNT(*) FROM 
(SELECT t.emp_no,t.birth_date, t.first_name,
t.last_name,t.gender, t.hire_date, t.dept_no,titles.title FROM titles INNER JOIN 
(SELECT e.emp_no,e.birth_date, e.first_name,e.last_name,e.gender, e.hire_date, d.dept_no FROM employees AS e INNER JOIN dept_emp AS d ON e.emp_no = d.emp_no ) AS t 
ON titles.emp_no = t.emp_no) AS r 
WHERE r.title = 'Senior Engineer';





SELECT * FROM 
(SELECT t.emp_no,t.birth_date, t.first_name,
t.last_name,t.gender, t.hire_date, t.dept_no,titles.title FROM titles INNER JOIN 
(SELECT e.emp_no,e.birth_date, e.first_name,e.last_name,e.gender, e.hire_date, d.dept_no FROM employees AS e INNER JOIN dept_emp AS d ON e.emp_no = d.emp_no ) AS t 
ON titles.emp_no = t.emp_no) AS r 
WHERE r.title = 'Manager' LIMIT 5;



CALL employee_with_title();

CALL employee_with_title(NULL);

CALL employee_with_title('Technique Leader');


CALL employee_with_title('Manager');

	
  DELIMITER $$

USE `employees`$$

DROP PROCEDURE IF EXISTS `employee_with_title`$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `employee_with_title`(IN title VARCHAR(16))

 
BEGIN
 -- DECLARE my_query VARCHAR(2000) DEFAULT '';

SET @str_sql = NULL;

SET @str_sql = CONCAT('SELECT t.emp_no, t.birth_date, t.first_name, 
t.last_name,t.gender, t.hire_date, t.dept_no, titles.title FROM titles INNER JOIN (SELECT e.emp_no,e.birth_date, e.first_name, 
e.last_name, e.gender, e.hire_date, d.dept_no FROM employees e INNER JOIN dept_emp d ON e.emp_no = d.emp_no ) t ON titles.emp_no = t.emp_no
where 1 = 1',IF(title IS NULL,'',CONCAT(' and title = ''',title,'''')),';');

PREPARE my_query FROM @str_sql;
EXECUTE my_query;
DEALLOCATE PREPARE my_query;

	END$$
	
DELIMITER ;






