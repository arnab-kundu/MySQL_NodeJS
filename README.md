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



sp CALL employees_detalis(10)
=============================

DELIMITER $$

CREATE
    /*[DEFINER = { user | CURRENT_USER }]*/
    PROCEDURE `employees`.`employees_detalis`(IN index_no INT)
    /*LANGUAGE SQL
    | [NOT] DETERMINISTIC
    | { CONTAINS SQL | NO SQL | READS SQL DATA | MODIFIES SQL DATA }
    | SQL SECURITY { DEFINER | INVOKER }
    | COMMENT 'string'*/
	BEGIN
		SELECT g.*, DATE_FORMAT(h.birth_date,'%Y-%m-%d') birth_date, h.first_name,h.last_name, h.gender, DATE_FORMAT(h.hire_date,'%Y-%m-%d') hire_date FROM(
		SELECT e.*, f.salary FROM(
		SELECT d.emp_no, d.title, GROUP_CONCAT(d.dept_no) dept_no, GROUP_CONCAT(d.grp_manager) managers, GROUP_CONCAT(d.dept_name) dept_name FROM(
		SELECT c.*, departments.dept_name FROM(
		SELECT b.*, j.grp_manager FROM(
		SELECT a.*, `dept_emp`.dept_no FROM(
		SELECT `employees`.emp_no, GROUP_CONCAT(`titles`.title SEPARATOR ", ") AS title FROM 
		`employees` INNER JOIN `titles` ON `employees`.emp_no = `titles`.emp_no GROUP BY `employees`.emp_no LIMIT index_no, 10
		) a INNER JOIN `dept_emp` ON a.emp_no = `dept_emp`.emp_no
		) b INNER JOIN (
					SELECT i.dept_no, GROUP_CONCAT(i.manager_name SEPARATOR ", ") grp_manager FROM(
					SELECT dept_manager.emp_no, .dept_manager.dept_no, CONCAT(employees.first_name," ",employees.last_name) manager_name FROM `dept_manager` INNER JOIN `employees` ON `dept_manager`.emp_no = `employees`.emp_no
					) i GROUP BY i.dept_no
				) j ON b.dept_no = j.dept_no
		) c INNER JOIN `departments` ON c.dept_no = `departments`.dept_no
		) d GROUP BY d.emp_no
		) e INNER JOIN (SELECT emp_no,MAX(salary) salary FROM `salaries` GROUP BY emp_no) f ON e.emp_no = f.emp_no
		) g INNER JOIN `employees` h ON g.emp_no = h.emp_no;
	END$$

DELIMITER ;






