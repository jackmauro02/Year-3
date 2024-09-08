using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class LogicScript : MonoBehaviour
{
    public float playerHealth;
    public float playerPoints;
    public Text healthText;
    public Text pointsText;
    public Text bulletCount;
    public string bullets;
    
    public Transform canvasTransform; // Reference to the canvas for HUD
    public Jackfps fps;
    public JackNoMove jackNoMove;
    public SimpleShoot simpleShoot;
   
    private void Start()
    {
        fps = GameObject.FindGameObjectWithTag("Player").GetComponent<Jackfps>();
        jackNoMove = GameObject.FindGameObjectWithTag("Player").GetComponent<JackNoMove>();
        simpleShoot = GameObject.FindGameObjectWithTag("Gun").GetComponent<SimpleShoot>();
        //playerHealth = fps.startHealth();
        playerHealth = jackNoMove.startHealth();
        playerPoints = 0;
        bullets = simpleShoot.BulletStart();
        healthText.text = "Health: " + playerHealth.ToString();
        pointsText.text = "Points: " + playerPoints.ToString();
        bulletCount.text = bullets;
    }


    [ContextMenu("Increase points")]
    public void addPoints(float pointsToAdd)
    {
        playerPoints = playerPoints + pointsToAdd;
        pointsText.text = "Points: " + playerPoints.ToString();
    }

    [ContextMenu("Increase health")]
    public void addHealth(float healthToAdd)
    {
        playerHealth = playerHealth + healthToAdd;
        healthText.text ="Health: " +  playerHealth.ToString();
    }

    public void removeHealth(float healthToRemove)
    {
        playerHealth = playerHealth - healthToRemove;
        healthText.text ="Health: " +  playerHealth.ToString();
    }

    public void BulletUpdate(string updatedBullet)
    {
        bulletCount.text =  updatedBullet;
    }

    // Update the health HUD
    private void UpdateHealthHUD()
    {
        if (canvasTransform != null)
        {
            // Assuming you have a UI Text element with the name "HealthText" on your canvas
            //Text healthText = canvasTransform.Find("HealthText").GetComponent<Text>();
            //healthText.text = "Health: " + currentHealth.ToString("F0");
            Debug.Log("HealthHUD");
        }
    }
}
