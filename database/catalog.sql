SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';


-- -----------------------------------------------------
-- Schema catalog
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `catalog` DEFAULT CHARACTER SET utf8 ;
USE `catalog` ;

-- -----------------------------------------------------
-- Table `catalog`.`Disc`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `catalog`.`Disc` (
  `idDisc` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `artist_name` VARCHAR(45) NOT NULL,
  `genre` VARCHAR(45) NOT NULL,
  `year` DATE NOT NULL,
  `createdAt` DATE NOT NULL,
  `modifiedAt` DATE NULL,
  PRIMARY KEY (`idDisc`),
  UNIQUE INDEX `idDisc_UNIQUE` (`idDisc` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `catalog`.`Collection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `catalog`.`Collection` (
  `idCollection` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(100) NULL,
  `createdAt` DATE NOT NULL,
  `modifiedAt` DATE NULL,
  PRIMARY KEY (`idCollection`),
  UNIQUE INDEX `idCollection_UNIQUE` (`idCollection` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `catalog`.`Disc_Collection`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `catalog`.`Disc_Collection` (
  `Disc_idDisc` INT NOT NULL,
  `Collection_idCollection` INT NOT NULL,
  PRIMARY KEY (`Disc_idDisc`, `Collection_idCollection`),
  INDEX `fk_Disc_has_Collection_Collection1_idx` (`Collection_idCollection` ASC) VISIBLE,
  INDEX `fk_Disc_has_Collection_Disc_idx` (`Disc_idDisc` ASC) VISIBLE,
  CONSTRAINT `fk_Disc_has_Collection_Disc`
    FOREIGN KEY (`Disc_idDisc`)
    REFERENCES `catalog`.`Disc` (`idDisc`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Disc_has_Collection_Collection1`
    FOREIGN KEY (`Collection_idCollection`)
    REFERENCES `catalog`.`Collection` (`idCollection`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
