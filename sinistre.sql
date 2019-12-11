-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  mer. 11 déc. 2019 à 22:03
-- Version du serveur :  10.4.6-MariaDB
-- Version de PHP :  7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `sinistre`
--

-- --------------------------------------------------------

--
-- Structure de la table `agent`
--

CREATE TABLE `agent` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(25) NOT NULL,
  `fonction` varchar(255) NOT NULL,
  `origine` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `date_creation` int(11) NOT NULL,
  `derniere_connexion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `agent`
--

INSERT INTO `agent` (`id`, `nom`, `prenom`, `fonction`, `origine`, `email`, `password`, `date_creation`, `derniere_connexion`) VALUES
(1, 'kouame', 'kambel', 'gestionnaire', 'axa', 'oikambelkouame@gmail.com', '08074105', 0, 0),
(2, 'kouame', 'kambel', 'gestionnaire', 'axa', 'oikambelkouame@gmail.com', '08074105', 0, 0),
(3, 'goli', 'de', 'policier', 'arrondissement4', 'de@gmail.com', '123456789', 0, 0),
(4, 'de', 'don', 'expert', 'atas', 'delo@gmail.com', '123456789', 0, 0),
(5, 'goli', 'de', 'policier', 'arrondissement4', 'de@gmail.com', '123456789', 0, 0),
(6, 'de', 'don', 'expert', 'atas', 'delo@gmail.com', '123456789', 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `blockdonnee`
--

CREATE TABLE `blockdonnee` (
  `id` int(11) NOT NULL,
  `donne1` varchar(255) NOT NULL,
  `donne2` varchar(255) NOT NULL,
  `donne3` int(255) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `blockdonnee`
--

INSERT INTO `blockdonnee` (`id`, `donne1`, `donne2`, `donne3`, `date`) VALUES
(1, 'ka', 'AXA', 12, '2019-12-07'),
(2, 'kambel', 'AXA', 12, '2019-12-07'),
(3, 'kambel', 'AXA', 12, '2019-12-07'),
(4, 'mkjhb', 'ihoùio', 8, '2019-12-07'),
(5, 'tfgsde', 'ghfds', 554, '2019-12-07'),
(6, '', '', 0, '2019-12-07'),
(7, 'kambel', 'esatic', 20000, '2019-12-07'),
(8, 'koffi', 'edy', 200000, '2019-12-07'),
(9, 'hui', 'ee', 2000, '2019-12-07'),
(10, 'edy', 'edy', 8, '2019-12-07'),
(11, '', '', 0, '2019-12-07'),
(12, 'koffi', 'ee', 554, '2019-12-08'),
(13, 'mkjhb', 'ghfds', 554, '2019-12-08'),
(14, 'ka', 'ihoùio', 554, '2019-12-08'),
(15, 'ztoi', 'zetio', 7775, '2019-12-08'),
(16, 'sldkgjeoi', 'mdkfjNZOI', 87869, '2019-12-08'),
(17, 'SPEOHPMO', 'SODIFH', 67685, '2019-12-08'),
(18, 'dfjkgzioua', 'aoibolizf', 7, '2019-12-09'),
(19, 'dfjkgzioua', 'aoibolizf', 7584, '2019-12-09'),
(20, '', '', 0, '2019-12-09'),
(21, '', '', 0, '2019-12-09'),
(22, 'ldfkzneaqf', 'sdfsmklblk', 78945612, '2019-12-09'),
(23, '', '', 0, '2019-12-09'),
(24, 'qsfds', 'fdbdfb', 5835, '2019-12-09'),
(25, 'dfh', 'wdfh', 53, '2019-12-09'),
(26, 'dfhd', 'ghjf', 412456, '2019-12-09'),
(27, 'sdgsgsrg', 'rgher', 86786, '2019-12-09'),
(28, 'kambel', 'edy', 98, '2019-12-11'),
(29, 'koffi', 'esatic', 65, '2019-12-11'),
(30, 'dsfgh', 'qsfdgh', 75286453, '2019-12-11'),
(31, 'cxjhgj', 'xkcjkj', 69289, '2019-12-11'),
(32, 'uigpuf', 'kjgdsoîp', 97889798, '2019-12-11');

-- --------------------------------------------------------

--
-- Structure de la table `declaration_2`
--

CREATE TABLE `declaration_2` (
  `id` int(11) NOT NULL,
  `nom` varchar(200) DEFAULT NULL,
  `prenoms` varchar(200) DEFAULT NULL,
  `num_police` varchar(200) DEFAULT NULL,
  `date_declaration` varchar(255) DEFAULT NULL,
  `type_sinistre` varchar(200) DEFAULT NULL,
  `nb_mort` varchar(200) DEFAULT NULL,
  `nb_blesse` varchar(200) DEFAULT NULL,
  `constat` varchar(200) DEFAULT NULL,
  `niveau` varchar(255) NOT NULL,
  `status` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `declaration_2`
--

INSERT INTO `declaration_2` (`id`, `nom`, `prenoms`, `num_police`, `date_declaration`, `type_sinistre`, `nb_mort`, `nb_blesse`, `constat`, `niveau`, `status`) VALUES
(5, 'ibrahim', 'khalil', 'AUTO-SAHAM-20191210-002', '2019-12-11 20:21:04.556', 'bris de glace', '5', '1', 'non', 'ordre et expert', 'en cours'),
(6, 'ibrahim', 'khalil', 'AUTO-2ACI-20190923-002', '2019-12-11 20:42:43.518', 'vol', '0', '0', 'oui', 'ordre et expert', 'en cours');

-- --------------------------------------------------------

--
-- Structure de la table `declaration_sinistre`
--

CREATE TABLE `declaration_sinistre` (
  `id` int(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `numero_police` varchar(255) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `facture` varchar(255) NOT NULL,
  `num_card` varchar(255) NOT NULL,
  `date_declaration` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `reclamation`
--

CREATE TABLE `reclamation` (
  `id` int(11) NOT NULL,
  `type_sinistre` varchar(255) NOT NULL,
  `ville` varchar(255) NOT NULL,
  `assurance` varchar(255) NOT NULL,
  `commune` varchar(255) NOT NULL,
  `immatriculation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `reclamation`
--

INSERT INTO `reclamation` (`id`, `type_sinistre`, `ville`, `assurance`, `commune`, `immatriculation`) VALUES
(39, '', '', '', '', ''),
(40, 'hdff', 'cbv', 'ffgfgrftru', 'essaie', 'dff4245486'),
(41, 'kof', 'xvghghb', 'zerty', 'dfgh', 'bvncxv424877878'),
(42, 'azer', 'kof', 'zerty', 'ergertge', 'bvncxv424877878'),
(43, 'xx', 'abidjan', 'axa', 'fg', 'fcv556668'),
(44, 'kof', 'kof', 'ffgfgrftru', 'ergertge', 'bvncxv42'),
(45, 'dfhhj', '', 'zerty', '', 'dff4245486'),
(46, 'dfhhj', '', 'zerty', '', 'dff4245486'),
(47, 'kambelo', '', 'axe', '', 'azert'),
(48, 'kambel', 'mfkserj', 'saham', 'sdfoiejze', 'azertyu5468945126'),
(49, 'kouame', '', 'axa', '', '998653'),
(50, 'sqdfg', '', 'qsdfgh', '', 'dsfg'),
(51, 'kouame', '', 'axa', '', ''),
(52, 'new test ', '', 'odo', '', ''),
(53, 'new test ', '', 'odo', '', '');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created` date NOT NULL,
  `modified` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `created`, `modified`) VALUES
(1, '', '', '', '', '2019-12-03', '2019-12-03'),
(2, 'kouame', 'oi kambel', 'oikambelkouame@gmail.com', '08074105', '2019-12-04', '2019-12-04'),
(3, 'test', 'test', 'clo@gmail.com', '789', '2019-12-06', '2019-12-06'),
(4, 'kouame', 'kouame', 'oikambelkouame@gmail.com', '78789', '2019-12-06', '2019-12-06'),
(5, 'az', 'azzer', 'veu@veu.com', '123456789', '2019-12-06', '2019-12-06');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `agent`
--
ALTER TABLE `agent`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `blockdonnee`
--
ALTER TABLE `blockdonnee`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `declaration_2`
--
ALTER TABLE `declaration_2`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `reclamation`
--
ALTER TABLE `reclamation`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `agent`
--
ALTER TABLE `agent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `blockdonnee`
--
ALTER TABLE `blockdonnee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT pour la table `declaration_2`
--
ALTER TABLE `declaration_2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `reclamation`
--
ALTER TABLE `reclamation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
